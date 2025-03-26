'use client'

const SecurityPage = () => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-md text-gray-700" placeholder="Current Password" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-md text-gray-700" placeholder="New Password" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-md text-gray-700" placeholder="Confirm New Password" />
                </div>
            </div>
        </div>
    )
}

export default SecurityPage;