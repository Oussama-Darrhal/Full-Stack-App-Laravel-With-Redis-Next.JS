
export default function Loading() {
    return (
        <main className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <div className="h-10 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="h-8 bg-gray-300 rounded-lg w-64 animate-pulse"></div>
                        <div className="mt-4 h-6 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                    </div>
                    <div className="h-11 bg-gray-200 rounded-lg w-36 animate-pulse"></div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6 space-y-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                </div>
            </div>
        </main>
    );
}