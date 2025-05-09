//
//
// export default function JjBanner({ className, imageUrl, title,onClick, buttonText }) {
//
//     return (
//         <div className="relative rounded-xl overflow-hidden shadow-md w-full max-w-md mx-auto">
//             <img
//                 src={imageUrl}
//                 alt="배너 배경 이미지"
//                 className="w-full h-auto object-cover"
//             />
//             <div className="absolute inset-0 bg-green-500 bg-opacity-70 flex flex-col justify-center p-6">
//                 <div className="text-white text-lg font324223-semibold leading-tight mb-2">
//                     {title}
//                 </div>
//                 <button
//                     onClick={onClick}
//                     className="bg-white text-green-700 font324223-semibold px-4 py-2 rounded shadow hover:bg-green-100 transition"
//                 >
//                     {buttonText}
//                 </button>
//             </div>
//         </div>
//     );
// };