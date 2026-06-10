import { defineField, defineType } from "sanity";

const COLOR_THEMES = [
  { title: "Blue",         value: "blue" },
  { title: "Purple",       value: "purple" },
  { title: "Amber / Gold", value: "amber" },
  { title: "Green",        value: "green" },
  { title: "Red",          value: "red" },
];

export const productSchema = defineType({
  name:  "product",
  title: "Product",
  type:  "document",

  fields: [
    /* ─── Identity ──────────────────────────────────────── */
    defineField({
      name: "name", title: "Product Name", type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug", title: "URL Slug", type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (R) => R.required(),
    }),
    defineField({ name: "shortName", title: "Short Name (nav / card)", type: "string" }),
    defineField({ name: "subtitle",  title: "Subtitle",               type: "string" }),

    /* ─── Copy ───────────────────────────────────────────── */
    defineField({
      name: "description", title: "Short Description (card)",
      type: "text", rows: 3,
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: "longDescription", title: "Full Description (product page)",
      type: "text", rows: 8,
    }),

    /* ─── Pricing & Stock ───────────────────────────────── */
    defineField({
      name: "price", title: "Price (USD)", type: "number",
      validation: (R) => R.required().positive(),
    }),
    defineField({ name: "originalPrice", title: "Original / Strike-through Price (USD)", type: "number" }),
    defineField({
      name: "inStock", title: "In Stock", type: "boolean",
      initialValue: true,
    }),

    /* ─── Specs ─────────────────────────────────────────── */
    defineField({ name: "concentration",   title: "Concentration",     type: "string", initialValue: "5mg" }),
    defineField({ name: "vialSize",        title: "Vial Size",         type: "string", initialValue: "2mL" }),
    defineField({ name: "purity",          title: "Purity",            type: "string", initialValue: "≥99%" }),
    defineField({ name: "sequence",        title: "Amino Acid Sequence", type: "string" }),
    defineField({ name: "molecularWeight", title: "Molecular Weight",  type: "string" }),
    defineField({ name: "casNumber",       title: "CAS Number",        type: "string" }),
    defineField({
      name: "storage", title: "Storage Instructions", type: "string",
      initialValue: "Lyophilized: -20°C. Reconstituted: 2–8°C, use within 28 days.",
    }),

    /* ─── Classification ─────────────────────────────────── */
    defineField({ name: "category", title: "Category", type: "string", initialValue: "Research Peptides" }),
    defineField({
      name: "tags", title: "Tags",
      type: "array", of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured", title: "Show on Homepage", type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "badge", title: "Badge Text (BESTSELLER, NEW BATCH…)", type: "string" }),

    /* ─── Marketing copy ─────────────────────────────────── */
    defineField({
      name: "benefits", title: "Key Benefits (bullet points)",
      type: "array", of: [{ type: "string" }],
    }),
    defineField({
      name: "researchAreas", title: "Research Areas",
      type: "array", of: [{ type: "string" }],
    }),
    defineField({
      name: "stacksWith", title: "Stacks With (product slugs)",
      type: "array", of: [{ type: "string" }],
      description: "Enter slug IDs of compatible products, e.g. bpc-157",
    }),

    /* ─── Visual ─────────────────────────────────────────── */
    defineField({
      name: "colorTheme", title: "Color Theme",
      type: "string",
      options: { list: COLOR_THEMES, layout: "radio" },
      initialValue: "blue",
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "category", status: "inStock" },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle} · ${status ? "✓ In stock" : "✗ Out of stock"}`,
      };
    },
  },
});
