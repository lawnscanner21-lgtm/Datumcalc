import { NextResponse } from 'next/server';
import { getCoreSitemapUrls, getSEOSitemapUrls, getEventsSitemapUrls } from '@/lib/seo/sitemapEngine';
import { SITE_URL } from '@/lib/constants';

/**
 * Trigger IndexNow submission to Bing and Yandex.
 * Best used via a Vercel Cron or on-demand after major content updates.
 */
export async function GET(request: Request) {
    // 1. Security Check (Optional: You can add a secret query param if you want to prevent spam)
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('token');
    
    // For now, we allow it to be triggered, but we can tighten this later
    // if (key !== process.env.INDEXNOW_SECRET) { ... }

    const INDEXNOW_KEY = '878dc35e02e64ed49f57edd01ea0b48a';

    // 2. Gather URLs to submit (Top 500 priority URLs)
    const coreUrls = getCoreSitemapUrls().map(u => u.url);
    const seoUrls = getSEOSitemapUrls().map(u => u.url);
    const eventUrls = getEventsSitemapUrls().map(u => u.url);
    
    const allUrls = [...coreUrls, ...seoUrls, ...eventUrls].slice(0, 500);

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                host: SITE_URL.replace('https://', '').replace('http://', ''),
                key: INDEXNOW_KEY,
                keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
                urlList: allUrls,
            }),
        });

        if (response.ok) {
            return NextResponse.json({ 
                success: true, 
                message: `Submitted ${allUrls.length} URLs to IndexNow successfully.`,
                status: response.status
            });
        } else {
            const errorText = await response.text();
            return NextResponse.json({ 
                success: false, 
                message: 'Failed to submit to IndexNow.',
                error: errorText,
                status: response.status
            }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ 
            success: false, 
            message: 'Internal Error during IndexNow submission.',
            error: error.message 
        }, { status: 500 });
    }
}
