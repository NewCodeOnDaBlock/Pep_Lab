export interface GuideSection {
  heading?: string;
  body: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  heroEyebrow: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  relatedProducts: string[];
  /** Slugs of products to render in an auto-generated spec comparison table */
  comparisonProducts?: string[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
}

export const guides: Guide[] = [
  {
    slug: "bpc-157-vs-tb-500",
    title: "BPC-157 vs. TB-500: How Two of the Most-Studied Research Peptides Compare",
    description:
      "A side-by-side look at BPC-157 and TB-500 — their origins, the mechanisms researchers study, and why the two are frequently examined together in preclinical work.",
    heroEyebrow: "PEPTIDE COMPARISON",
    category: "Comparisons",
    tags: ["BPC-157", "TB-500", "comparison", "research peptides"],
    publishedAt: "2026-04-14",
    readingTime: "7 min read",
    relatedProducts: ["bpc-157", "tb-500", "wolverine-stack"],
    comparisonProducts: ["bpc-157", "tb-500"],
    sections: [
      {
        body: `BPC-157 and TB-500 are two of the most frequently referenced peptides in preclinical literature, and they're often mentioned in the same breath. Researchers studying tissue-repair models, angiogenesis, and cellular regeneration frequently work with both — sometimes side by side, sometimes in combination. But despite showing up together so often, they come from completely different biological starting points and are studied through different mechanistic lenses.

This guide breaks down what separates the two, where their studied mechanisms intersect, and why investigators frequently examine them as a pair.`,
      },
      {
        heading: "Different origins, different starting points",
        body: `BPC-157 (Body Protection Compound 157) is a synthetic pentadecapeptide — a chain of 15 amino acids — derived from a partial sequence of a protective protein identified in human gastric juice. Its gut-derived origin is part of why early research interest gravitated toward gastrointestinal and tissue-repair models.

TB-500, by contrast, is a synthetic peptide corresponding to the active region of Thymosin Beta-4 (Tβ4), a naturally occurring 43-amino-acid protein found throughout the body and especially concentrated in platelets and wound fluid. Rather than being a complete protein, TB-500 represents the fragment of Tβ4 that carries its most-studied functional domain.

In short: one is a small synthetic sequence inspired by a gastric-protective protein, and the other is a synthetic fragment of a much larger structural protein the body already produces.`,
      },
      {
        heading: "The mechanisms researchers are looking at",
        body: `The two peptides are studied through largely distinct mechanistic frameworks.

BPC-157 research has focused heavily on its interactions with the nitric oxide signaling pathway and growth hormone receptor expression, alongside documented interest in how it interfaces with several neurotransmitter systems. Much of the preclinical interest in angiogenesis (the formation of new blood vessels) and tissue-repair modeling traces back to these pathway interactions.

TB-500 research centers on actin — specifically, the peptide contains the actin-binding domain Ac-LKKTETQ, which is the focus of most mechanistic study. This domain is associated with actin sequestration, a process tied to cellular migration. TB-500's interactions with the PINCH-ILK-parvin complex are also a recurring theme in literature examining cell movement and tissue remodeling.

Put simply: BPC-157's studied mechanisms run largely through signaling pathways (nitric oxide, growth hormone receptors), while TB-500's run largely through structural and cytoskeletal biology (actin regulation, cell migration).`,
      },
      {
        heading: "Where research interest overlaps",
        body: `Despite their different mechanistic starting points, BPC-157 and TB-500 converge on several shared areas of preclinical interest — most notably angiogenesis and tissue-repair modeling. Because the two appear to act through complementary rather than redundant pathways, researchers studying multi-mechanism approaches to tissue remodeling often examine them in parallel or in combination. That overlap is the rationale behind pre-paired bundles like the [Wolverine Stack](/products/wolverine-stack), which exists specifically to support comparative or combination-protocol designs without sourcing each peptide separately.`,
      },
      {
        heading: "Comparing the essentials",
        body: `Mechanism aside, the two peptides also differ in some of their basic handling specs. Here's how our current batches compare side by side — pulled directly from the Certificate of Analysis data for each.`,
      },
    ],
    faqs: [
      {
        question: "Can BPC-157 and TB-500 be studied together?",
        answer:
          "Yes — it's a common design choice in preclinical work. Because the two appear to act through different, and potentially complementary, pathways, researchers often examine them in parallel arms or in combination protocols. [Pre-paired bundles](/products/wolverine-stack) exist specifically to support that kind of comparative design without having to source and match batches of each peptide independently.",
      },
      {
        question: "Which one has been studied for longer?",
        answer:
          "Both have substantial bodies of preclinical literature, though the focus areas differ — BPC-157's research history leans toward gastrointestinal and tissue-repair models given its gut-derived origin, while TB-500's traces back to the broader study of Thymosin Beta-4 in wound healing and cardiac research.",
      },
      {
        question: "Are BPC-157 and TB-500 held to the same purity standard?",
        answer:
          "Purity is batch- and supplier-specific, so the only reliable answer is the Certificate of Analysis for the exact batch in front of you. Our [guide to reading a CoA](/guides/understanding-certificates-of-analysis) walks through exactly what to check before trusting a purity claim.",
      },
    ],
  },
  {
    slug: "storing-handling-research-peptides",
    title: "Storing and Handling Lyophilized Research Peptides: A Lab Reference Guide",
    description:
      "Why research peptides ship freeze-dried, how storage requirements change at each stage, and the cold-chain practices that keep samples viable from dispatch to your freezer.",
    heroEyebrow: "LAB HANDLING",
    category: "Lab Handling",
    tags: ["storage", "lyophilization", "cold chain", "lab protocols"],
    publishedAt: "2026-04-28",
    readingTime: "6 min read",
    relatedProducts: ["bpc-157", "tb-500", "wolverine-stack"],
    sections: [
      {
        body: `Peptides are delicate molecules. Heat, light, repeated freeze–thaw cycles, and time spent in solution can all degrade them before they ever reach a bench — which is why how a peptide is shipped, stored, and handled matters just as much as where it came from. This guide walks through why research peptides arrive freeze-dried, how storage requirements change at each stage of their life in your lab, and the cold-chain practices that keep a sample scientifically usable.

Nothing below is intended as instruction for human use. It describes general laboratory storage and handling practices referenced in supplier documentation and standard research protocols.`,
      },
      {
        heading: "Why peptides ship as lyophilized powder",
        body: `Almost all research peptides — including [BPC-157](/products/bpc-157) and [TB-500](/products/tb-500) — are shipped as lyophilized (freeze-dried) powder rather than pre-mixed solutions. Lyophilization removes water from the peptide while it's frozen, which dramatically slows the chemical degradation pathways — hydrolysis, oxidation, aggregation — that occur much faster once a molecule is in liquid form.

In practical terms, this is what makes it possible to ship peptides without an unbroken cold chain for the entire journey, and it's why a properly stored lyophilized vial can remain viable for a long stretch of time, whereas the same peptide in solution has a much shorter usable window.`,
      },
      {
        heading: "Storage conditions at each stage",
        body: `Storage requirements shift significantly once a peptide moves out of its lyophilized state.

Lyophilized (powder) form: store at approximately -20°C, away from light and humidity. In this state, properly handled peptides are generally documented as stable for extended periods — many suppliers, including ours, note shelf stability well beyond a year when the vial is kept frozen and sealed.

Reconstituted (in-solution) form: once a peptide has been reconstituted, the clock starts running. Refrigeration at 2–8°C is the standard guidance, and most documentation recommends use within roughly 28 days. Reconstituted peptides shouldn't go through repeated freeze–thaw cycles — each cycle adds stress that accelerates degradation.

In transit: because even brief heat exposure can affect peptide integrity, shipments are typically packed with ice packs and insulated materials to hold a stable temperature from the moment they leave the supplier to the moment they arrive.`,
      },
      {
        heading: "General handling considerations",
        body: `A handful of habits show up consistently across lab protocols and supplier documentation:

Minimize light exposure. Many peptides are light-sensitive, so storing vials in their original packaging — or wrapping them in foil — helps preserve integrity.

Avoid unnecessary temperature swings. Repeatedly moving a vial between the freezer and room temperature introduces condensation and accelerates breakdown. Plan bench work so vials leave cold storage only when they're actually needed.

Treat reconstitution like any sterile-technique task. Standard lab practice calls for appropriate sterile equipment and technique when bringing a lyophilized compound into solution — the same care you'd apply to any sensitive biological reagent.

Track everything. Batch numbers, reconstitution dates, and concentrations should travel with the sample, both for your own records and so results stay traceable back to a specific Certificate of Analysis.`,
      },
      {
        heading: "Why cold chain matters from order to doorstep",
        body: `Storage discipline doesn't start when the box arrives — it starts when the order ships. That's part of why we coordinate directly with our dropship and fulfillment partner on same-day cold-chain preparation: insulated packaging and ice packs go in at the point of dispatch, so the product arrives in the condition its CoA describes — not just close to it. Once a shipment lands on your bench, our [guide to reading a Certificate of Analysis](/guides/understanding-certificates-of-analysis) covers what to check before you log it into your inventory.`,
      },
    ],
    faqs: [
      {
        question: "How long do lyophilized peptides stay stable in the freezer?",
        answer:
          "This varies by peptide and formulation, but properly sealed lyophilized powder kept at roughly -20°C is commonly documented as stable for well over a year. Always defer to the specific guidance included with your batch's Certificate of Analysis rather than general rules of thumb.",
      },
      {
        question: "Why does a reconstituted peptide need to be used so much sooner than the powder?",
        answer:
          "Once water is reintroduced, the degradation pathways that were essentially paused in the freeze-dried state become active again. Refrigeration slows that process but doesn't stop it — which is why roughly 28 days at 2–8°C is the commonly cited window for solutions.",
      },
      {
        question: "Does it actually matter how a peptide is packaged for shipping?",
        answer:
          "Yes — temperature stability in transit is one of the most overlooked variables in research peptide quality. A perfectly manufactured batch can still be compromised by a slow, uninsulated shipment, which is why cold-chain handling from the moment of dispatch is part of how we manage fulfillment.",
      },
    ],
  },
  {
    slug: "understanding-certificates-of-analysis",
    title: "Understanding Certificates of Analysis: How to Verify Research Peptide Purity",
    description:
      "What a Certificate of Analysis actually shows, why independent third-party testing matters, and how to read HPLC and mass spec results before trusting a batch.",
    heroEyebrow: "QUALITY & TESTING",
    category: "Quality & Testing",
    tags: ["Certificate of Analysis", "HPLC", "purity testing", "quality control"],
    publishedAt: "2026-05-12",
    readingTime: "7 min read",
    relatedProducts: ["bpc-157", "tb-500", "wolverine-stack"],
    sections: [
      {
        body: `The research peptide market has very little standardized oversight, and product quality can vary enormously from one supplier to the next. The single most useful tool a researcher has for cutting through that uncertainty is the Certificate of Analysis (CoA) — a lab report documenting what's actually inside a given batch. Knowing how to read one, and knowing when one is missing something it shouldn't be, is one of the most practical skills in sourcing research compounds responsibly.`,
      },
      {
        heading: "What a Certificate of Analysis actually documents",
        body: `A proper CoA is a batch-specific lab report, not a generic spec sheet. At minimum, it should tie back to the exact batch or lot number on your vial, and it typically includes:

HPLC (High-Performance Liquid Chromatography) results, which separate a sample into its components and report the proportion that matches the target compound — this is where a stated purity percentage, such as ≥99%, comes from.

Mass spectrometry confirmation, which verifies that the molecule's mass matches what's expected for the intended sequence — confirming identity, not just purity.

Batch or lot identifiers, testing dates, and the testing laboratory's information.

Together, these answer two separate questions: is this the molecule it claims to be (identity, via mass spec), and how much of the vial is that molecule versus other material (purity, via HPLC)?`,
      },
      {
        heading: "Why third-party testing is the detail that matters most",
        body: `Almost any manufacturer can produce a document that says "99% pure." The meaningful distinction is who ran the test. In-house testing has an obvious incentive problem: the same party with a financial interest in the result is the one producing it. Independent, third-party laboratory testing removes that conflict of interest, and it's the standard credible suppliers hold themselves to.

When evaluating a source, it's worth asking not just "do they provide a CoA," but "is the testing lab named, independent, and verifiable?" A CoA from an unnamed or in-house lab tells you far less than one from a named, independent facility.`,
      },
      {
        heading: "How to read the numbers",
        body: `A few practical pointers for interpreting what's in front of you:

Purity percentage reflects the proportion of the sample that matches the target compound by HPLC peak area — generally, the closer to 100%, the fewer impurities or byproducts are present. Most credible research-grade peptides report purity in the high 90s.

Molecular weight confirmation from mass spectrometry should match the published value for the compound's sequence — for example, BPC-157's expected molecular weight is roughly 1419.53 g/mol, and TB-500's is roughly 2888.46 g/mol. A mismatch here is a far bigger red flag than a slightly lower purity figure, since it suggests the vial may not contain what it claims to.

Batch alignment matters — a CoA is only meaningful if it corresponds to the specific lot you actually received. A generic or outdated CoA attached to every shipment regardless of batch number is effectively meaningless.`,
      },
      {
        heading: "Red flags worth watching for",
        body: `A few patterns are worth treating with skepticism when sourcing research compounds: no CoA offered, or one available only "on request" that never quite arrives; a CoA that doesn't reference a specific batch or lot number; purity figures with no testing methodology or laboratory named; and listings priced well below the norm with no explanation for how quality is maintained at that cost.

None of these automatically means a product is mishandled — but together, they describe the profile of a source that hasn't invested in the verification step, which is exactly the part of the process you're least equipped to redo yourself after the fact.`,
      },
    ],
    faqs: [
      {
        question: "Do you provide a Certificate of Analysis with every order?",
        answer:
          "Yes. Every batch we carry is sent to an independent laboratory for HPLC purity testing and mass spectrometry confirmation, and a CoA ships with every order. You can read more about our testing process on our [About page](/about#coa).",
      },
      {
        question: "What purity level should I expect from research-grade peptides?",
        answer:
          "It varies by compound and supplier, but credible research-grade material is typically documented at ≥99% purity by HPLC. Anything significantly lower — or any listing that doesn't state a methodology at all — deserves a closer look before you trust it.",
      },
      {
        question: "Is HPLC the same thing as mass spectrometry?",
        answer:
          "No — they answer different questions. HPLC is primarily a purity measurement (how much of the sample is the target compound), while mass spectrometry confirms molecular identity (whether the compound matches the expected structure). A thorough CoA includes both, not just one.",
      },
    ],
  },
  {
    slug: "bpc-157-research-overview",
    title: "BPC-157 Research Overview: Origins, Studied Mechanisms, and Active Research Areas",
    description:
      "A research-focused look at BPC-157 — where the pentadecapeptide comes from, the biological pathways it's studied through, and where it shows up most often in the preclinical literature.",
    heroEyebrow: "PEPTIDE PROFILE",
    category: "Peptide Profiles",
    tags: ["BPC-157", "pentadecapeptide", "angiogenesis", "research overview"],
    publishedAt: "2026-05-26",
    readingTime: "7 min read",
    relatedProducts: ["bpc-157", "wolverine-stack"],
    sections: [
      {
        body: `Few research peptides show up in the preclinical literature as often as BPC-157. Short for "Body Protection Compound 157," it's a synthetic pentadecapeptide that has drawn sustained interest from research groups studying tissue repair, angiogenesis, and gastrointestinal biology. This overview covers where BPC-157 comes from, the mechanisms researchers most commonly study, and the areas where it continues to appear in the literature.`,
      },
      {
        heading: "What BPC-157 is — and where it comes from",
        body: `BPC-157 is a synthetic chain of 15 amino acids (a pentadecapeptide) with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val. It's derived from a partial sequence of a larger protective protein identified in human gastric juice — part of why early and ongoing research interest has gravitated toward gastrointestinal and tissue-protective contexts.

At a molecular weight of roughly 1419.53 g/mol (CAS 137525-51-0), it's a relatively small, stable synthetic compound — properties that make it practical to manufacture at high purity and that have helped it become one of the most extensively referenced peptides in preclinical work.`,
      },
      {
        heading: "The mechanisms under the microscope",
        body: `Research into BPC-157 has concentrated on a handful of biological systems.

The nitric oxide pathway: a substantial portion of the literature on BPC-157 investigates its interaction with nitric oxide signaling, a system heavily involved in vascular and tissue-level processes.

Growth hormone receptor expression: studies have explored how BPC-157 interacts with growth hormone receptors, a line of inquiry connected to its broader profile in tissue-related research.

Neurotransmitter system interactions: research has also examined BPC-157's relationship with multiple neurotransmitter systems, extending interest in the compound beyond purely tissue-focused models.

These overlapping lines of inquiry are part of why BPC-157 keeps appearing across such a wide range of study designs — its studied mechanisms touch several systems that are independently of interest to different research groups.`,
      },
      {
        heading: "Where BPC-157 shows up in the research literature",
        body: `Drawing on its documented mechanisms, BPC-157 tends to appear in a recurring set of research contexts: angiogenesis, the study of new blood vessel formation closely tied to its nitric oxide pathway interactions; tissue-repair models, in vitro and animal studies examining regenerative processes at the cellular and tissue level; gastrointestinal research, a natural extension of its gastric-derived origin; neuropeptide studies, building on its documented interactions with neurotransmitter systems; and musculoskeletal research, a frequent application area in preclinical tissue-modeling work.

It's worth emphasizing that all of the above describes areas where BPC-157 appears in preclinical and in vitro research — not claims about effects in humans. The compound is supplied strictly for laboratory and preclinical research use.`,
      },
      {
        heading: "Sourcing BPC-157 for research",
        body: `Because BPC-157 is small, stable, and relatively straightforward to synthesize at high purity, the supply side of the market is crowded — which makes verification more important, not less. Every batch of our [BPC-157](/products/bpc-157) (5mg, ≥99.1% purity) ships with an independent Certificate of Analysis confirming both identity, via mass spectrometry, and purity, via HPLC. If you're new to reading these reports, our [guide to understanding a CoA](/guides/understanding-certificates-of-analysis) walks through exactly what to look for.

Researchers frequently study BPC-157 alongside [TB-500](/products/tb-500) given the apparent complementary nature of their mechanisms — see our [side-by-side comparison](/guides/bpc-157-vs-tb-500), or the pre-paired [Wolverine Stack](/products/wolverine-stack) for combination-protocol work.`,
      },
    ],
    faqs: [
      {
        question: 'What does "pentadecapeptide" mean?',
        answer:
          "It simply describes the molecule's structure — a peptide chain composed of exactly 15 amino acids. BPC-157's full sequence is Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val.",
      },
      {
        question: "Is BPC-157 derived from an animal or human source?",
        answer:
          "The synthetic compound sold for research is manufactured, not extracted from any source — but its sequence is derived from a partial fragment of a protective protein originally identified in human gastric juice.",
      },
      {
        question: "What purity should I look for in a research-grade BPC-157 batch?",
        answer:
          "Look for an independent CoA reporting purity via HPLC — ≥99% is the benchmark for high-quality research material — alongside a mass spectrometry result confirming the expected molecular weight of approximately 1419.53 g/mol.",
      },
    ],
  },
  {
    slug: "tb-500-research-overview",
    title: "TB-500 Research Overview: From Thymosin Beta-4 to the Actin-Binding Mechanism",
    description:
      "A research-focused look at TB-500 — its relationship to Thymosin Beta-4, the actin-binding domain researchers study most, and where the peptide shows up in the preclinical literature.",
    heroEyebrow: "PEPTIDE PROFILE",
    category: "Peptide Profiles",
    tags: ["TB-500", "Thymosin Beta-4", "actin", "research overview"],
    publishedAt: "2026-06-02",
    readingTime: "7 min read",
    relatedProducts: ["tb-500", "wolverine-stack"],
    sections: [
      {
        body: `TB-500 occupies a slightly different niche in the research-peptide world than most of its peers: rather than being a wholly novel synthetic sequence, it's a fragment of a protein the body already produces. That relationship — and the specific structural domain TB-500 is built around — is the key to understanding why it shows up so often in research on cell migration, tissue remodeling, and angiogenesis.`,
      },
      {
        heading: "A synthetic fragment of a naturally occurring protein",
        body: `TB-500 corresponds to the active region of Thymosin Beta-4 (Tβ4), a naturally occurring 43-amino-acid protein present throughout the body and especially concentrated in platelets and wound fluid. Rather than synthesizing the entire 43-amino-acid protein, TB-500 represents the specific fragment that carries Tβ4's most-studied functional domain — at a molecular weight of roughly 2888.46 g/mol (CAS 77591-33-4).

This matters because it shapes the entire research lens: instead of asking "what does this novel molecule do," researchers studying TB-500 are largely asking "how does this specific functional region of a protein the body already makes behave on its own?"`,
      },
      {
        heading: "The actin-binding domain: Ac-LKKTETQ",
        body: `The detail that anchors most TB-500 research is its actin-binding domain — found within the full sequence Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln, where the shorter Ac-LKKTETQ motif is the primary subject of mechanistic study.

Actin is one of the cell's core structural proteins, central to maintaining shape and enabling movement. TB-500's interaction with actin is described in the literature as a sequestration process, and that process is closely tied to cellular migration — the way cells move through and reorganize tissue. Research has also pointed to TB-500's interactions with the PINCH-ILK-parvin complex, a signaling assembly involved in how cells attach to and move across surfaces.`,
      },
      {
        heading: "Where TB-500 shows up in the research literature",
        body: `Building on its actin-related mechanism, TB-500 tends to appear in a recurring set of research areas: cellular migration studies, directly tied to its actin-sequestration profile; angiogenesis research, examining new blood vessel formation, an area where cell movement plays a central role; wound healing models, consistent with Tβ4's natural concentration in wound fluid; cardiac research, a notable and recurring application area in the broader Thymosin Beta-4 literature; and tissue remodeling studies more broadly, anywhere cell motility and structural reorganization are central questions.

As with all peptides on this site, the above describes areas of preclinical and in vitro research interest. TB-500 is supplied strictly for laboratory research use — not for human or veterinary application.`,
      },
      {
        heading: "Sourcing TB-500 for research",
        body: `Because TB-500 corresponds to a naturally occurring protein fragment, confirming both identity and purity is especially important — minor synthesis errors can produce a sequence that's subtly different from the one the literature actually describes. Every batch of our [TB-500](/products/tb-500) (5mg, ≥99.3% purity) ships with an independent Certificate of Analysis confirming molecular identity via mass spectrometry and purity via HPLC. For a walkthrough of what those reports show, see our [guide to reading a CoA](/guides/understanding-certificates-of-analysis).

TB-500 is frequently studied alongside [BPC-157](/products/bpc-157) — the two are thought to act through complementary rather than overlapping mechanisms, which is the premise behind both our [side-by-side comparison guide](/guides/bpc-157-vs-tb-500) and the pre-paired [Wolverine Stack](/products/wolverine-stack).`,
      },
    ],
    faqs: [
      {
        question: "Is TB-500 the same thing as Thymosin Beta-4?",
        answer:
          "Not exactly — TB-500 is a synthetic peptide that corresponds to the active fragment of the larger, naturally occurring Thymosin Beta-4 protein, rather than being the full 43-amino-acid molecule itself.",
      },
      {
        question: "What is the Ac-LKKTETQ sequence?",
        answer:
          "It's the actin-binding motif within TB-500's structure and the focus of most mechanistic research on the peptide — central to the actin-sequestration process researchers study in relation to cellular migration.",
      },
      {
        question: "How does TB-500 differ from BPC-157 in what's being studied?",
        answer:
          "They're studied through largely different mechanistic lenses — TB-500 research centers on actin regulation and cell migration, while BPC-157 research centers on nitric oxide signaling and growth hormone receptor interactions. Our [full comparison guide](/guides/bpc-157-vs-tb-500) covers this in more depth.",
      },
    ],
  },
];

export const getGuideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

export const getGuidesForProduct = (productSlug: string) =>
  guides.filter((g) => g.relatedProducts.includes(productSlug));

export const guideCategories = Array.from(new Set(guides.map((g) => g.category)));
