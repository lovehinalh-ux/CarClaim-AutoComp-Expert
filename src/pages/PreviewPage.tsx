import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PDFPreview from '../components/PDFPreview';
import SEO from '../components/SEO';
import { useClaimContext } from '../context/claimContextCore';
import type { ToolPageLocationState } from './ToolPage';

const PreviewPage: React.FC = () => {
    const navigate = useNavigate();
    const { formState, effectiveItems, totalClaimAmount, netClaimAmount, hasData, isComplete } = useClaimContext();

    // Nothing to report, or reached via reload/back/direct link with an incomplete
    // form: back to the form, which re-runs the same validation and focuses the problem.
    if (!hasData) return <Navigate to="/" replace />;
    if (!isComplete) return <Navigate to="/" replace state={{ validate: true } satisfies ToolPageLocationState} />;

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
                    items={effectiveItems}
                    customItems={formState.customItems}
                    totalAmount={totalClaimAmount}
                    faultPercent={formState.faultPercent}
                    netAmount={netClaimAmount}
                    medicalEntries={formState.medicalEntries}
                    onBack={() => navigate('/')}
                    onPrint={() => window.print()}
                />
            </main>
        </div>
    );
};

export default PreviewPage;
