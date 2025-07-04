/** @jsx jsx */
import { jsx, Container, Box, Flex } from "theme-ui";
import { keyframes } from "@emotion/core";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import PriceCard from "components/price-card";
import ButtonGroup from "components/button-group";
import SectionHeader from "components/section-header";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

// 1. Impor data terpusat
import data from "config/data.json";

// 2. Ambil data yang relevan dan pisahkan paket bulanan/tahunan
const { pricing } = data;
const { monthly, annual } = pricing.plans;

// Konfigurasi Carousel, tidak berubah
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		draggable: false,
	},
	tablet: {
		breakpoint: { max: 1023, min: 640 },
		items: 2,
		draggable: true,
	},
	mobile: {
		breakpoint: { max: 639, min: 0 },
		items: 1,
		draggable: true,
	},
};

export default function Package() {
	// State management untuk beralih antara paket bulanan dan tahunan
	const [state, setState] = useState({
		active: "monthly",
		pricingPlan: monthly, // Inisialisasi state dengan data dari JSON
	});

	// Fungsi untuk mengubah paket harga
	const handlePricingPlan = (plan) => {
		if (plan === "annual") {
			setState({
				active: "annual",
				pricingPlan: annual, // Gunakan data 'annual' dari JSON
			});
		} else {
			setState({
				active: "monthly",
				pricingPlan: monthly, // Gunakan data 'monthly' dari JSON
			});
		}
	};
    
    // 4. Helper untuk mengubah string ikon dari JSON menjadi komponen ikon React
	const getIcon = (iconString) => {
		switch (iconString) {
			case "checkmark":
				return <IoIosCheckmarkCircle />;
			case "close":
				return <IoIosCloseCircle />;
			default:
				return null;
		}
	};

	// Parameter untuk slider Carousel
	const sliderParams = {
		additionalTransfrom: 0,
		arrows: false,
		autoPlaySpeed: 3000,
		centerMode: false,
		className: "",
		slidesToSlide: 1,
		items: 3,
		containerClass: "carousel-container",
		customButtonGroup: <ButtonGroup />,
		dotListClass: "",
		focusOnSelect: false,
		infinite: false,
		keyBoardControl: false,
		itemClass: "",
		minimumTouchDrag: 80,
		renderButtonGroupOutside: true,
		renderDotsOutside: false,
		responsive: responsive,
		showDots: false,
		sliderClass: "",
	};

	return (
		<section id="pricing" sx={{ variant: "section.pricing" }}>
			<Container>
				{/* 3. Gunakan data dari JSON untuk header */}
				<SectionHeader
					slogan={pricing.slogan}
					title={pricing.title}
				/>
				<Flex sx={styles.buttonGroup}>
					<Box sx={styles.buttonGroupInner}>
						<button
							className={state.active === "monthly" ? "active" : ""}
							type="button"
							aria-label="Monthly"
							onClick={() => handlePricingPlan("monthly")}
						>
							{pricing.toggle.monthly}
						</button>
						<button
							className={state.active === "annual" ? "active" : ""}
							type="button"
							aria-label="Annual"
							onClick={() => handlePricingPlan("annual")}
						>
							{pricing.toggle.annual}
						</button>
					</Box>
				</Flex>
				<Box sx={styles.pricingWrapper} className="pricing__wrapper">
					<Carousel {...sliderParams}>
						{state.pricingPlan.map((packageData) => {
							// Buat salinan data paket dan ubah poin ikonnya dari string ke komponen
							const packageWithIcons = {
								...packageData,
								points: packageData.points.map((point) => ({
									...point,
									icon: getIcon(point.icon), // Ubah string ke komponen
								})),
							};
							return (
								<Box sx={styles.pricingItem} key={packageData.id}>
									{/* Kirim data yang sudah diolah ke komponen PriceCard */}
									<PriceCard data={packageWithIcons} />
								</Box>
							);
						})}
					</Carousel>
				</Box>
			</Container>
		</section>
	);
}

// Definisi Keyframes untuk animasi
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeIn2 = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
		transform: translateY(0);
    opacity: 1;
  }
`;

// Kode styles lengkap tanpa pemotongan
const styles = {
	pricingWrapper: {
		mb: "-40px",
		mt: "-40px",
		mx: -3,
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		"&.pricing__wrapper .package__card": {
			".package__header": {
				animation: `${fadeIn} 0.8s ease-in`,
			},
			"ul > li": {
				animation: `${fadeIn2} 0.7s ease-in`,
			},
			".package__price": {
				animation: `${fadeIn2} 0.9s ease-in`,
			},
			button: {
				animation: `${fadeIn2} 1s ease-in`,
			},
		},
		".carousel-container": {
			width: "100%",
			"> ul > li ": {
				display: "flex",
			},
		},
		".button__group": {
			display: ["flex", null, null, null, "none"],
			mb: [4, null, null, null, 0],
		},
	},
	pricingItem: {
		mx: 3,
		display: "flex",
		flexShrink: 0,
		flex: "1 1 auto",
	},
	buttonGroup: {
		justifyContent: "center",
		mb: "7",
		mt: ["-15px", "-35px"],
		position: "relative",
		zIndex: 2,
	},
	buttonGroupInner: {
		display: "flex",
		padding: "7px",
		margin: "0 auto",
		borderRadius: "5px",
		backgroundColor: "#F7F8FB",
		button: {
			border: 0,
			padding: ["15px 20px", "15px 27px"],
			borderRadius: "5px",
			color: "text",
			fontSize: [1, 2],
			lineHeight: 1.2,
			fontWeight: 500,
			backgroundColor: "transparent",
			cursor: "pointer",
			fontFamily: "body",
			letterSpacing: "-0.24px",
			transition: "all 0.3s",
			"&.active": {
				color: "#0f2137",
				backgroundColor: "#ffffff",
				boxShadow: "0 3px 4px rgba(38, 78, 118, 0.1)",
			},
			"&:focus": {
				outline: 0,
			},
		},
	},
};
