import SearchBox from "../common/SearchBox";
import Image from "../common/Image";

function Header() {
    return (
        <header className="relative bg-night-owl shadow-lg py-1 w-full">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-28">
                <div className="flex justify-between items-center">
                    <Image
                        src="\public\hutao-avatar.gif"
                        alt="Logo"
                        width={40}
                        height={40}
                        onClickImage={() => (window.location.href = "/")}
                    />
                    <div className="flex flex-row items-center">
                        <SearchBox
                            handleOnSearch={() => alert("Search initiated!")}
                        />
                        <div
                            className="flex flex-col items-center ml-1 cursor-pointer"
                            onClick={() =>
                                (window.location.href = "/dang-nhap")
                            }
                        ></div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
