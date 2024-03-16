import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const ImgStack = () => {
  return (
    <ImageList sx={{ height: "20%", m: 2}} cols={1}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <h4>{item.heading}</h4>
          <img
            src={`${item.img}?w=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <p style={{ textAlign: "justify"}}>{item.description}</p>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ImgStack

const itemData = [
  {
    heading: "Crypto Mining",
    img: "/img/home1.jpeg",
    title: "Breakfast",
    description:
      "Mining is the process of creating new Bitcoin and  other cryptocurrencies and verifying transactions involving those coins. It involves vast, distributed networks of computers that check and secure blockchains, which are digital ledgers that track cryptocurrency transactions.",
  },
  {
    heading: "Crypto & Forex Trading",
    img: "/img/home2.jpeg",
    title: "Burger",
    description:
      "Dubai and australia is the country that uses cryptocurrency trading the most, thus we collaborate with the two most well-known companies, IC Markets and Binance. OnmaxDT is prepared to spread its wings over numerous nations, paving the way for numerous trading prospects. You can now rely on our firm, DTF, to receive an effective, equitable, and trustworthy service.",
  },
  {
    heading: "Crypto Education",
    img: "/img/home3.jpeg",
    title: "Camera",
    description:
      "The Dream the future education program focuses on harnessing the power of optimistic thinking to create a better world. We make sure that our clients are aware of the financial potential and rewards available through modern web marketing.",
  },
  {
    heading: "Crypto investment",
    img: "/img/home4.jpeg",
    title: "Coffee",
    description: "Cryptocurrency is digital currency secured by blockchain technology. Cryptocurrency investing can take many forms, from buying cryptocurrency directly to investing in crypto currencies and companies. A crypto exchange may buy cryptocurrency through us or other brokers when prices are low and resell them when prices rise",
  },
];