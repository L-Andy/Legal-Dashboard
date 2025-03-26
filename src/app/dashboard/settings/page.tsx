'use client';

const SettingsPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" defaultValue="John" className="w-full p-2 border border-gray-300 rounded-md text-gray-900" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full p-2 border border-gray-300 rounded-md text-gray-900" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full p-2 border border-gray-300 rounded-md text-gray-900" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" defaultValue="07700000000" className="w-full p-2 border border-gray-300 rounded-md text-gray-900" />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                    defaultValue="Legal professional with over 10 years of experience in corporate law."
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                    rows={3}
                ></textarea>
            </div>
        </div>
    );
}

export default SettingsPage;
