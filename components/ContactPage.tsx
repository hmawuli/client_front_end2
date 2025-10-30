import React, { useContext, useState } from 'react';
import { PageContext } from '../App';
import PublicLayout from './PublicLayout';
import EditableText from './EditableText';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from './icons';

const ContactPage: React.FC = () => {
    const context = useContext(PageContext);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    if (!context) {
        return <div>Loading...</div>;
    }

    const { content, setContent, isEditing } = context;

    const handleFormUpdate = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleContactUpdate = (field: keyof typeof content.contact, value: string) => {
        setContent(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value
            }
        }));
    };

    return (
        <PublicLayout>
            <main>
                <section className="bg-base-200 py-20 px-8 text-center">
                    <EditableText
                        isEditing={isEditing}
                        value={content.contact.title}
                        onSave={(value) => handleContactUpdate('title', value)}
                        className="text-5xl font-bold text-text-primary"
                        tag="h1"
                    />
                    <EditableText
                        isEditing={isEditing}
                        value={content.contact.text}
                        onSave={(value) => handleContactUpdate('text', value)}
                        className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary"
                        tag="p"
                    />
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
                                        <EditableText
                                            isEditing={true}
                                            value={formData.name}
                                            onSave={(value) => handleFormUpdate('name', value)}
                                            className="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm bg-base-100"
                                            placeholder="Enter your full name"
                                            tag="div"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-text-secondary">Email Address</label>
                                        <EditableText
                                            isEditing={true}
                                            value={formData.email}
                                            onSave={(value) => handleFormUpdate('email', value)}
                                            className="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm bg-base-100"
                                            placeholder="Enter your email address"
                                            tag="div"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-text-secondary">Message</label>
                                        <EditableText
                                            isEditing={true}
                                            value={formData.message}
                                            onSave={(value) => handleFormUpdate('message', value)}
                                            className="mt-1 block w-full px-3 py-2 border border-base-300 rounded-md shadow-sm bg-base-100 min-h-[120px]"
                                            placeholder="Your message"
                                            tag="div"
                                            isTextarea={true}
                                        />
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
                                    <EditableText
                                        isEditing={isEditing}
                                        value={content.contact.address}
                                        onSave={(value) => handleContactUpdate('address', value)}
                                        className="text-text-secondary"
                                        tag="p"
                                    />
                                </div>
                             </div>
                             <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-primary pt-1"><EnvelopeIcon/></div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Email Us</h3>
                                    <EditableText
                                        isEditing={isEditing}
                                        value={content.contact.email}
                                        onSave={(value) => handleContactUpdate('email', value)}
                                        className="text-text-secondary"
                                        tag="p"
                                    />
                                </div>
                             </div>
                             <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-primary pt-1"><PhoneIcon/></div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Call Us</h3>
                                    <EditableText
                                        isEditing={isEditing}
                                        value={content.contact.phone}
                                        onSave={(value) => handleContactUpdate('phone', value)}
                                        className="text-text-secondary"
                                        tag="p"
                                    />
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