// src/components/ErrorPage.jsx
export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Oops!</h1>
        <p>Something went wrong while loading the page.</p>
      </div>
    </div>
  );
}
