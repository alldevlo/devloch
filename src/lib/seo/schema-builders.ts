import { siteConfig } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqItemLike = {
  question: string;
  answer: string;
};

type HowToStepLike = {
  title: string;
  description: string;
};

type ArticleSchemaInput = {
  headline: string;
  description: string;
  path: string;
  imagePath?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  authorUrl?: string;
};

type ReviewSchemaInput = {
  author: string;
  reviewBody: string;
  ratingValue?: number;
  itemReviewed: {
    name: string;
    description?: string;
  };
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function buildFaqPageSchema(items: FaqItemLike[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHowToSchema(name: string, steps: HowToStepLike[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    ...(input.imagePath && {
      image: input.imagePath.startsWith("http")
        ? input.imagePath
        : `${siteConfig.url}${input.imagePath}`,
    }),
    datePublished: input.datePublished ?? "2024-01-01",
    dateModified: input.dateModified ?? new Date().toISOString().split("T")[0],
    author: input.author
      ? {
          "@type": "Person",
          name: input.author,
          ...(input.authorUrl && { url: input.authorUrl }),
        }
      : {
          "@type": "Organization",
          name: "devlo",
          url: siteConfig.url,
        },
    publisher: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/devlo-logo.webp`,
      },
    },
  };
}

type VideoObjectInput = {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl?: string;
  duration?: string;
};

export function buildVideoObjectSchema(input: VideoObjectInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl.startsWith("http")
      ? input.thumbnailUrl
      : `${siteConfig.url}${input.thumbnailUrl}`,
    uploadDate: input.uploadDate,
    ...(input.embedUrl && { embedUrl: input.embedUrl }),
    ...(input.duration && { duration: input.duration }),
    publisher: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
    },
  };
}

export function buildReviewSchema(reviews: ReviewSchemaInput[]) {
  const ratingValues = reviews
    .map((r) => r.ratingValue)
    .filter((v): v is number => v !== undefined);
  const avgRating =
    ratingValues.length > 0
      ? ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
      : 5;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Prospection commerciale B2B externalisée",
    provider: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(reviews.length),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.author,
      },
      reviewBody: r.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.ratingValue ?? 5),
        bestRating: "5",
      },
    })),
  };
}

export function buildCourseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation prospection commerciale B2B",
    description:
      "Formation gratuite : 50 tutoriels vidéo, cold email, LinkedIn, téléprospection. Accès à vie.",
    url: `${siteConfig.url}/academy`,
    provider: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
    },
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      name: "Formation prospection B2B — Accès à vie",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "47",
    },
  };
}
