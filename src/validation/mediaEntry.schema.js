import z from "zod"

const rating7 = z.number().int().min(1).max(7);

const seasonRatingSchema = z.object({
  rating: rating7,
  remarks: z.string().max(500).optional()
});

const seasonRatingsSchema = z.record(seasonRatingSchema); 

const baseEntrySchema = z.object({
  type: z.enum(["movie", "series"]),
  title: z.string().min(1).max(200),
  dateLogged: z.coerce.date().optional(),
  ratingOverall: rating7,
  remarks: z.string().max(1000).optional(),
  seasonWiseEnabled: z.boolean().optional(),
  seasonRatings: seasonRatingsSchema.optional()
});

const createEntrySchema = baseEntrySchema.superRefine((data, ctx) => {
  const seasonWiseEnabled = data.seasonWiseEnabled ?? false;

  if (data.type === "movie") {
    if (seasonWiseEnabled === true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["seasonWiseEnabled"],
        message: "seasonWiseEnabled must be false for movies"
      });
    }
    if (data.seasonRatings !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["seasonRatings"],
        message: "seasonRatings is not allowed for movies"
      });
    }
  }

  if (data.type === "series") {
    if (data.seasonRatings !== undefined && seasonWiseEnabled === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["seasonWiseEnabled"],
        message: "Enable seasonWiseEnabled to provide seasonRatings"
      });
    }
  }
});

const updateEntrySchema = baseEntrySchema
  .partial()
  .superRefine((data, ctx) => {
    
    
    if (data.type === "movie") {
      if (data.seasonWiseEnabled === true) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["seasonWiseEnabled"],
          message: "seasonWiseEnabled must be false for movies"
        });
      }
      if (data.seasonRatings !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["seasonRatings"],
          message: "seasonRatings is not allowed for movies"
        });
      }
    }
    if (data.type === "series") {
      const seasonWiseEnabled = data.seasonWiseEnabled;
      if (data.seasonRatings !== undefined && seasonWiseEnabled === false) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["seasonWiseEnabled"],
          message: "Enable seasonWiseEnabled to provide seasonRatings"
        });
      }
    }
  });

export default { createEntrySchema, updateEntrySchema };
