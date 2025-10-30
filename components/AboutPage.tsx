import React, { useContext } from 'react';
import { PageContext } from '../App';
import PublicLayout from './PublicLayout';

const AboutPage: React.FC = () => {
    const context = useContext(PageContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { content } = context;

    return (
        <PublicLayout>
            <main>
                <section className="bg-base-200 py-20 px-8 text-center">
                    <h1 className="text-5xl font-bold text-text-primary">{content.about.title}</h1>
                </section>

                <section className="py-20 px-8">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                             <h2 className="text-3xl font-bold text-text-primary">Our Story</h2>
                             <p className="text-text-secondary leading-relaxed">{content.about.text}</p>
                             <p className="text-text-secondary leading-relaxed">
                                Founded on the principle of empowerment, we strive to deliver tools that are not only powerful but also a joy to use. Our journey is one of continuous innovation and dedication to our users' success.
                             </p>
                        </div>
                        <img src={content.about.imageUrl} alt="About us" className="rounded-lg shadow-xl" />
                    </div>
                </section>

                 <section className="py-20 px-8 bg-base-200">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-text-primary mb-4">Our Mission</h2>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
                            "To provide an intuitive and powerful platform that enables creators and businesses of all sizes to build a stunning online presence with ease, fostering growth and creativity in the digital world."
                        </p>
                    </div>
                 </section>
            </main>
        </PublicLayout>
    );
};

export default AboutPage;
