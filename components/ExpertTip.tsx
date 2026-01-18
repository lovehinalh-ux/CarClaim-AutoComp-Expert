import React from 'react';
import { UserCheck } from 'lucide-react';

interface Props {
    content: string;
    source?: string;
}

const ExpertTip: React.FC<Props> = ({ content, source }) => {
    return (
        <div className="relative mt-4 mb-6 group">
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
            <div className="bg-yellow-50/50 border border-yellow-100 rounded-r-xl p-4 pl-6 relative">
                <div className="absolute -top-3 -left-2 bg-white rounded-full p-1 border border-yellow-200 shadow-sm">
                    <UserCheck size={16} className="text-yellow-600" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    <span className="text-yellow-700 font-bold block mb-1 text-xs uppercase tracking-wider">Expert Tip</span>
                    {content}
                </p>
                {source && (
                    <div className="mt-2 text-[10px] text-slate-400 font-mono border-t border-yellow-100/50 pt-2 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">Source</span>
                        {source}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpertTip;
