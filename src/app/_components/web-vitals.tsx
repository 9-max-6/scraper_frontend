'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
    useReportWebVitals((metric) => {
        switch (metric.name) {
            case 'FCP':
                // handle FCP results
                console.log("FCP: ", metric.value);
                break;
            case 'LCP':
                // handle LCP results
                console.log("LCP: ", metric.value);
                break;
            case 'CLS':
                // handle CLS results
                console.log("CLS: ", metric.value);
                break;
            case 'FID':
                // handle FID results
                console.log("FID: ", metric.value);
                break;
            case 'TTFB':
                // handle TTFB results
                console.log("TTFB: ", metric.value);
                break;
            case 'Next.js-hydrationn':
                // handle Next.js-hydrationn results
                console.log("Next.js-hydrationn: ", metric.value);
                break;
            case 'Next.js-route-change-to-render':
                // handle Next.js-route-change-to-render results
                console.log("Next.js-route-change-to-render: ", metric.value);
                break;
            case 'Next.js-render':
                // handle Next.js-render results
                console.log("Next.js-render: ", metric.value);
                break;
        }
    })

    return null
}