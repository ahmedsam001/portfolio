import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedsami.dev"),
  title: "Ahmed Sami Fathi — Data Engineer Portfolio",
  description:
    "Data Engineer building ETL/ELT pipelines, data warehouses, and real-time data systems with Python, SQL, Spark, dbt, Kafka, and Snowflake.",
  keywords: [
    "Data Engineer",
    "ETL",
    "ELT",
    "Apache Spark",
    "dbt",
    "Snowflake",
    "Kafka",
    "Airflow",
    "Python",
    "SQL",
    "Ahmed Sami Fathi",
  ],
  authors: [{ name: "Ahmed Sami Fathi" }],
  openGraph: {
    type: "website",
    title: "Ahmed Sami Fathi — Data Engineer Portfolio",
    description:
      "Data Engineer building ETL/ELT pipelines, data warehouses, and real-time data systems with Python, SQL, Spark, dbt, Kafka, and Snowflake.",
    images: [
      {
        url: "/assets/profile-photo.jpg",
        width: 800,
        height: 800,
        alt: "Ahmed Sami Fathi, Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Sami Fathi — Data Engineer Portfolio",
    description:
      "Data Engineer building ETL/ELT pipelines and real-time data systems with Python, Spark, dbt, and Snowflake.",
    images: ["/assets/profile-photo.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-bg-base text-text-primary font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
