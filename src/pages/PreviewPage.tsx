import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PDFPreview from '../components/PDFPreview';
import SEO from '../components/SEO';
import { useClaimContext } from '../context/ClaimContext';
import { ArrowLeft, Loader2, Download, Printer } from 'lucide-react';

const PreviewPage: React.FC = () => {
    const navigate = useNavigate();
    const { formState, totalClaimAmount, medicalTotal } = useClaimContext();

    // PDFPreview already handles the print/download logic internally via props, 
    // but we can wrap it or just reuse the internal logic if we expose it.
    // However, the current PDFPreview component has its own 'Download' button inside. 
    // We can just render PDFPreview full screen.

    return (
        <div className="min-h-screen bg-[var(--color-brand-background)] text-[var(--color-brand-secondary)] flex flex-col">
            <SEO />
            <div className="no-print">
                <Header />
            </div>

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
                <PDFPreview
                    claimantName={formState.claimantName}
                    accidentDate={formState.accidentDate}
                    items={formState.items}
                    customItems={formState.customItems}
                    totalAmount={totalClaimAmount}
                    medicalEntries={formState.medicalEntries}
                    onBack={() => navigate('/')}
                    onPrint={() => window.print()}
                    hideControls={false} // Show controls in this dedicated page
                />
            </main>
        </div>
    );
};

export default PreviewPage;
