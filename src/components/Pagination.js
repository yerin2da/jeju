import React from 'react';
import TailButton from "../UI/TailButton";

const Pagination = ({
                        currentPage,
                        totalPages,
                        setCurrentPage,
                        maxVisiblePages = 5,
                        showFirstLast = true
                    }) => {
    if (totalPages <= 1) return null; // 페이지가 하나뿐이면 렌더 X

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleFirst = () => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLast = () => {
        setCurrentPage(totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 숫자 페이지 범위 계산
    const getPageNumbers = () => {
        const pages = [];
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start < maxVisiblePages - 1) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-center items-center gap-1 pt-6 text-sm">
            {showFirstLast && (
                <TailButton caption="≪" handleClick={handleFirst} disabled={currentPage === 1} bcolor="blue" />
            )}
            <TailButton caption="＜" handleClick={handlePrev} disabled={currentPage === 1} bcolor="blue" />

            {/* 숫자 페이지 버튼 */}
            {pageNumbers[0] > 1 && (
                <span className="px-1 text-gray-400">...</span>
            )}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1 rounded ${
                        page === currentPage ? 'bg-mainColor text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                    {page}
                </button>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <span className="px-1 text-gray-400">...</span>
            )}

            <TailButton caption="＞" handleClick={handleNext} disabled={currentPage === totalPages} bcolor="blue" />
            {showFirstLast && (
                <TailButton caption="≫" handleClick={handleLast} disabled={currentPage === totalPages} bcolor="blue" />
            )}
        </div>
    );
};

export default Pagination;

{/*<Pagination*/}
{/*    currentPage={currentPage}*/}
{/*    totalPages={totalPages}*/}
{/*    setCurrentPage={setCurrentPage}*/}
{/*    maxVisiblePages={5}       // 선택 사항*/}
{/*    showFirstLast={true}      // 선택 사항*/}
{/*/>*/}