export const localizedPageByIdQuery = `
  *[_type in ["page", "service", "caseStudy"] && pageId == $pageId][0]{
    _id,
    _type,
    pageId,
    title,
    description,
    seoTitle,
    seoDescription,
    slug,
    ogImage,
    body,
    updatedAt
  }
`;
