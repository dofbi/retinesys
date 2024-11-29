import { useState } from 'react';

export default function UploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    duration: '',
    locations: [],
    files: []
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary');
    const files = Array.from(e.dataTransfer.files);
    setFormData(prev => ({
      ...prev,
      files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="upload" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Lancez votre campagne</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">E-mail</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Durée de la campagne</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
                required
              >
                <option value="">Sélectionnez une durée</option>
                <option value="7">7 jours</option>
                <option value="14">14 jours</option>
                <option value="30">30 jours</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Télécharger le contenu</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg 
                    className="w-12 h-12 text-gray-400 mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                  </span>
                </label>
              </div>
              {formData.files.length > 0 && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Fichiers sélectionnés:</p>
                  <ul className="space-y-2">
                    {formData.files.map((file, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg 
                          className="w-4 h-4 mr-2" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Soumettre la campagne
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
