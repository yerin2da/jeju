export default function JejuThemeGalleryCard({item}) {

    return (
        <div className={`contentsBox !p-0 overflow-hidden !rounded-2xl bg-white`}>

            <div className={`px-6 py-4`}>
                <div className={`font-bold text-xl mb-2`}>
                    {item.spotName}
                </div>
                <div className={`text-gray-700`}>
                    <p className={`text-sm font-medium multi-ellipsis`}>{item.courseName}</p>
                    <p className={`text-xs text-gray-500`}>{item.address}</p>
                </div>

            </div>

        </div>
    );
};