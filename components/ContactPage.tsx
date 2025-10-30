import React, { useContext, useState } from 'react';
import { PageContext } from '../App';
import PublicLayout from './PublicLayout';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from './icons';

const ContactPage: React.FC = () => {
    const context = useContext(PageContext);
    const [submitted, setSubmitted] = useState(false);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { content } = context;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <PublicLayout>
            <main>
                <section className="bg-base-200 py-20 px-8 text-center">
                    <h1 className="text-5xl font-bold text-text-primary">{content.contact.title}</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                        {content.contact.text}
                    </p>
                </section>
                
                <section className="py-20 px-8">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-base-100 border border-base-300 p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-text-primary">Send us a Message</h2>
                            {submitted ? (
                                <div className="bg-accent/10 text-accent-dark p-4 rounded-md text-center">
                                    <h3 className="font-semibold">Thank you!</h3>
                                    <p>Your message has been sent successfully.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Full Name</label>
                                        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-base-100" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-text-secondary">Email Address</label>
                                        <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-base-100" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-text-secondary">Message</label>
                                        <textarea name="message" id="message" rows={5} required className="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-base-100"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 transition-opacity">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                             <h2 className="text-2xl font-bold mb-6 text-text-primary">Contact Information</h2>
                             <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-primary pt-1"><MapPinIcon/></div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Our Office</h3>
                                    <p className="text-text-secondary">123 Innovation Drive, Tech City, 12345</p>
                                </div>
                             </div>
                             <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-primary pt-1"><EnvelopeIcon/></div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Email Us</h3>
                                    <p className="text-text-secondary">contact@wowlogbook.com</p>
                                </div>
                             </div>
                             <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-primary pt-1"><PhoneIcon/></div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Call Us</h3>
                                    <p className="text-text-secondary">(123) 456-7890</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
};

export default ContactPage;
