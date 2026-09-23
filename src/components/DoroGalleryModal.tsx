import React, { useState } from 'react';
import { DORO_GALLERY_IMAGES } from '../constants/doroGallery';
import { X, Image as ImageIcon, Sparkles, ExternalLink } from 'lucide-react';

interface DoroGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoroGalleryModal: React.FC<DoroGalleryModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'gif' | 'image'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = DORO_GALLERY_IMAGES.filter(filename => {
    if (filter === 'gif') return filename.endsWith('.gif');
    if (filter === 'image') return !filename.endsWith('.gif');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-pink-100">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-xs">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-1.5">
                <span>도로롱 짤 보물창고</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold">
                  {DORO_GALLERY_IMAGES.length}개
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                움직이는 짤부터 레전드 밈까지 모두 모아뒀다 도로롱!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex bg-white/80 p-0.5 rounded-xl border border-pink-200 text-xs font-bold">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filter === 'all' ? 'bg-pink-500 text-white shadow-2xs' : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                전체 ({DORO_GALLERY_IMAGES.length})
              </button>
              <button
                onClick={() => setFilter('gif')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  filter === 'gif' ? 'bg-pink-500 text-white shadow-2xs' : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>움직이는 GIF</span>
              </button>
              <button
                onClick={() => setFilter('image')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filter === 'image' ? 'bg-pink-500 text-white shadow-2xs' : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                이미지
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filtered.map((filename, idx) => {
              const isGif = filename.endsWith('.gif');
              const src = `./doro/gallery/${filename}`;

              return (
                <div
                  key={idx}
                  onClick={() => setPreviewImage(src)}
                  className="group relative aspect-square bg-white rounded-2xl p-2 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-pink-300 transition-all cursor-pointer flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`doro ${idx}`}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />

                  {isGif && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded-md bg-pink-500/90 text-[10px] font-black text-white shadow-2xs">
                      GIF
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Image Preview Modal */}
        {previewImage && (
          <div
            onClick={() => setPreviewImage(null)}
            className="absolute inset-0 z-60 bg-black/80 flex flex-col items-center justify-center p-4 animate-in fade-in duration-150"
          >
            <div className="relative max-w-sm sm:max-w-md w-full bg-white rounded-3xl p-4 shadow-2xl flex flex-col items-center">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-3">
                <img
                  src={previewImage}
                  alt="preview"
                  className="max-w-full max-h-full object-contain rounded-2xl"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <a
                  href={previewImage}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <span>원본 이미지 다운로드</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
