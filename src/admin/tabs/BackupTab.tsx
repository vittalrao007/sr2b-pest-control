import React, { useState } from 'react';
import { SiteConfig } from '../../types/config';
import { configService } from '../../services/configService';
import { Download, Upload, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
  resetToDefaults: () => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<SiteConfig>>;
}

export const BackupTab: React.FC<TabProps> = ({ formData, resetToDefaults, setFormData }) => {
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleExport = () => {
    configService.exportConfigAsJSON(formData);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const check = configService.validateConfigJSON(json);

        if (!check.valid) {
          setImportStatus({ success: false, message: check.error || 'Invalid configuration JSON.' });
          return;
        }

        setFormData(json);
        setImportStatus({
          success: true,
          message: 'Configuration JSON imported successfully! Click "Save Changes" to publish.',
        });
      } catch (err) {
        setImportStatus({ success: false, message: 'Failed to parse JSON file: ' + String(err) });
      }
    };
    reader.readAsText(file);
  };

  const handleResetConfirm = async () => {
    if (
      window.confirm(
        'Are you sure you want to restore the default SR2B demo configuration? Any customized data will be replaced.'
      )
    ) {
      await resetToDefaults();
      setImportStatus({
        success: true,
        message: 'Website configuration restored to official defaults successfully.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-[#183247]">Configuration Backup, Export & Restore</h3>
        <p className="text-xs text-stone-500">
          Export your current site settings as a JSON file, restore a previous backup, or reset to original defaults.
        </p>
      </div>

      {importStatus && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
            importStatus.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {importStatus.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-[#183247]">Export Configuration JSON</h4>
          <p className="text-xs text-stone-500 leading-relaxed">
            Download a complete snapshot of all services, pricing, business information, and SEO parameters to your local computer.
          </p>
          <div className="pt-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Backup</span>
            </button>
          </div>
        </div>

        {/* Import Card */}
        <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-[#183247]">Import Configuration JSON</h4>
          <p className="text-xs text-stone-500 leading-relaxed">
            Upload a previously exported configuration JSON file. Schema validation ensures corrupt files cannot overwrite existing settings.
          </p>
          <div className="pt-2">
            <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#183247] bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg cursor-pointer transition-colors shadow-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>Select Backup JSON File</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Restore Demo Defaults */}
      <div className="p-6 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-3">
        <div className="flex items-center gap-2 text-amber-800">
          <RotateCcw className="w-5 h-5 text-amber-700" />
          <h4 className="text-base font-bold">Restore Demo Defaults</h4>
        </div>
        <p className="text-xs text-amber-900/80 max-w-2xl leading-relaxed">
          Reset all business data, services list, testimonials, FAQs, and brand colors back to the original SR2B Pest Control demo state.
        </p>
        <div className="pt-1">
          <button
            onClick={handleResetConfirm}
            className="px-4 py-2 text-xs font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 rounded-lg transition-colors border border-amber-300"
          >
            Restore Default Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
