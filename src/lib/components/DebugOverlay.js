import dynamic from "next/dynamic";
import Image from "next/image";

import crossIcon from "@/icons/svg/cross.svg";
import settingsIcon from "@/icons/svg/settings.svg";
import { Suspense, useEffect, useState } from "react";

import "react18-json-view/src/style.css";

const Storage123 = dynamic(() => import("./Storage"), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});

function DebugOverlay() {
	const [mounted, setMounted] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <></>;

	return mounted && openPopup ? (
		<Suspense fallback={<>Loading</>}>
			<div className="fixed bottom-0 max-h-full sm:max-h-[calc(100vh-theme(space.8))] overflow-auto no-scrollbar right-0 w-full sm:w-1/2 sm:m-4 bg-white z-50 shadow-xl rounded-lg">
				<div className="sticky top-0 z-10 text-center bg-white/50 backdrop-blur py-4">
					<div className="relative">
						<h1 className="text-xl font-medium">App Settings</h1>
						<Image
							className="absolute top-0.5 right-4"
							src={crossIcon}
							width={24}
							height={24}
							alt="Open popup icon"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setOpenPopup(false);
							}}
						/>
					</div>
				</div>
				<div className="px-4 pb-4">{openPopup && <Storage123 />}</div>
			</div>
		</Suspense>
	) : (
		<div className="fixed bottom-0 right-0 m-5 z-50">
			<Image src={settingsIcon} width={24} height={24} alt="Open popup icon" onClick={() => setOpenPopup(true)} />
		</div>
	);
}

export default DebugOverlay;
