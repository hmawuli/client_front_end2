
import React, { useContext } from 'react';
import { PageContext } from '../App';
import EditableText from './EditableText';
import PublicLayout from './PublicLayout';
import { ChartBarIcon, PencilIcon, CloudIcon } from './icons';
import type { PageContextType } from '../types';

const iconMap: { [key: string]: React.ReactNode } = {
  'ChartBar': <ChartBarIcon />,
  'Pencil': <PencilIcon />,
  'Cloud': <CloudIcon />,
};

const PublicPage: React.FC = () => {
  const context = useContext(PageContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { content, setContent, isEditing } = context;

  const handleTextUpdate = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleServiceUpdate = (index: number, field: string, value: string) => {
    setContent(prev => {
        const newItems = [...prev.services.items];
        newItems[index] = { ...newItems[index], [field]: value };
        return {
            ...prev,
            services: {
                ...prev.services,
                items: newItems,
            }
        }
    });
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setContent(prev => ({
            ...prev,
            hero: {
              ...prev.hero,
              imageUrl: reader.result,
            },
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PublicLayout>
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] text-white group">
          <img src={content.hero.imageUrl} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
          {isEditing && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <label className="bg-white text-gray-800 px-6 py-3 rounded-md font-bold cursor-pointer hover:bg-gray-200 transition-colors">
                Change Hero Image
                <input type="file" accept="image/*" className="hidden" onChange={handleHeroImageUpload} />
              </label>
            </div>
          )}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
            <EditableText
              isEditing={isEditing}
              value={content.hero.title}
              onSave={(value) => handleTextUpdate('hero', 'title', value)}
              className="text-5xl md:text-7xl font-extrabold"
              tag="h1"
            />
            <EditableText
              isEditing={isEditing}
              value={content.hero.subtitle}
              onSave={(value) => handleTextUpdate('hero', 'subtitle', value)}
              className="mt-4 max-w-2xl text-lg md:text-xl"
              tag="p"
            />
            <div className="mt-8">
               <EditableText
                isEditing={isEditing}
                value={content.hero.cta}
                onSave={(value) => handleTextUpdate('hero', 'cta', value)}
                className="bg-primary hover:opacity-90 transition-opacity text-white font-bold py-3 px-8 rounded-full"
                tag="button"
                />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <EditableText
              isEditing={isEditing}
              value={content.about.title}
              onSave={(value) => handleTextUpdate('about', 'title', value)}
              className="text-4xl font-bold text-text-primary mb-4"
              tag="h2"
            />
             <EditableText
              isEditing={isEditing}
              value={content.about.text}
              onSave={(value) => handleTextUpdate('about', 'text', value)}
              className="text-text-secondary leading-relaxed max-w-3xl mx-auto"
              tag="p"
              isTextarea={true}
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-8 bg-base-200">
          <div className="max-w-6xl mx-auto text-center">
            <EditableText
              isEditing={isEditing}
              value={content.services.title}
              onSave={(value) => handleTextUpdate('services', 'title', value)}
              className="text-4xl font-bold text-text-primary mb-12"
              tag="h2"
            />
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {content.services.items.map((item, index) => (
                <div key={index} className="bg-base-100 p-8 rounded-lg shadow-lg">
                  <div className="text-primary w-12 h-12 mb-4">
                    {iconMap[item.icon] || <PencilIcon />}
                  </div>
                  <EditableText
                    isEditing={isEditing}
                    value={item.title}
                    onSave={(value) => handleServiceUpdate(index, 'title', value)}
                    className="text-xl font-bold mb-2"
                    tag="h3"
                  />
                  <EditableText
                    isEditing={isEditing}
                    value={item.description}
                    onSave={(value) => handleServiceUpdate(index, 'description', value)}
                    className="text-text-secondary"
                    tag="p"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-20 px-8 text-center">
            <EditableText
              isEditing={isEditing}
              value={content.contact.title}
              onSave={(value) => handleTextUpdate('contact', 'title', value)}
              className="text-4xl font-bold text-text-primary mb-4"
              tag="h2"
            />
            <EditableText
              isEditing={isEditing}
              value={content.contact.text}
              onSave={(value) => handleTextUpdate('contact', 'text', value)}
              className="max-w-2xl mx-auto text-text-secondary"
              tag="p"
            />
        </section>
      </main>
    </PublicLayout>
  );
};

export default PublicPage;