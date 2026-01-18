import React from 'react';

interface Props {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
}

const SEO: React.FC<Props> = ({
    title = "車禍求償小幫手 - 2026 最新賠償試算與專家建議",
    description = "2026 最新車禍理賠試算工具，包含折舊損害與薪資損失計算。",
    url = "https://car-claim.example.com",
    image = "https://img.icons8.com/fluency/240/calculator.png"
}) => {

    const formattedTitle = title.includes("車禍求償小幫手") ? title : `${title} | 車禍求償小幫手`;



    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "車禍精神慰撫金怎麼算？",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "精神慰撫金需考量傷勢程度、雙方身分地位與經濟狀況。一般輕傷約在 1~5 萬，骨折約 10~30 萬，重傷則可能更高，並無固定公式。"
                }
            },
            {
                "@type": "Question",
                "name": "車禍折舊率如何計算？",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "依據行政院固定資產耐用年数表，自用小客車耐用年數為 5 年，採用定率遞減法每年折舊 0.369。車齡超過 5 年者，零件部分僅剩殘值。"
                }
            }
        ]
    };

    return (
        <>
            <title>{formattedTitle}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={formattedTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            {/* JSON-LD Structured Data */}
            {/* SoftwareApplication schema moved to index.html */}
            <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
        </>
    );
};

export default SEO;
