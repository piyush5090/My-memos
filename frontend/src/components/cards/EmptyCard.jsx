import React from "react";

const EmptyCard = ({ isSearch }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20 sm:mt-40 opacity-40">
            {isSearch ? (
                <img
                    width="200"
                    height="200"
                    src="https://img.icons8.com/external-filled-outline-perfect-kalash/256/external-not-found-web-development-and-programming-filled-outline-perfect-kalash.png"
                    alt="external-not-found-web-development-and-programming-filled-outline-perfect-kalash"
                />
            ) : (
                <img
                    width="200"
                    height="200"
                    src="https://img.icons8.com/officel/160/add-property.png"
                    alt="add-property"
                    className="opacity-100"
                />
            )}
            <p className="w-3/4 sm:w-1/2 text-sm sm:text-md font-medium font-serif text-slate-700 text-center leading-7 mt-5">
                {isSearch ? (
                    "Oops, we can't find the matching note."
                ) : (
                    <>
                        <p>Start creating your first note!</p>
                        <p>Click the 'Add' button to jot down your thoughts, ideas, and reminders.</p>
                        <p>Let's get started!</p>
                    </>
                )}
            </p>
        </div>
    );
};

export default EmptyCard;
