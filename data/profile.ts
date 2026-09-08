// ─── Single source of truth for personal info ───────────────────────────────
export const profile = {
  name: "Ahmed Sami Fathi",
  displayName: "Ahmed Sami",
  role: "Data Engineer",
  subtitle: "ETL · Streaming · Analytics",
  tagline:
    "Building ETL/ELT pipelines, data warehouses, and real-time data systems with Python, SQL, Spark, dbt, Kafka, and Snowflake.",
  location: "Mansoura, Egypt",
  university: "Sinai University",
  degree: "Bachelor of Computer Science, Data Engineering Track",
  cgpa: "3.3 / 4.0 (Very Good)",
  graduationYear: "2027",

  links: {
    github: "https://github.com/ahmedsam001",
    linkedin: "https://www.linkedin.com/in/ahmed-sami-fath/",
    whatsapp: "https://wa.me/201152887590",
    email: "mailto:ahmedssami@gmail.com",
    cv: "/assets/Ahmed_Sami_Fathi_CV.pdf",
  },
} as const;
