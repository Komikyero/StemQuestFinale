import { addRewards } from './REWARDS.js';

const heartFull = "heart.png";
const heartEmpty = "no_lifeheart.png";
const HealthBar = document.querySelectorAll(".HeartTo");

let currentQuestion = 0;
let maxHealth = HealthBar.length;
let currentHealth = maxHealth;



export const allQuizzes = [
    [ // Handout 1
        {
            question: "Which of the following is not part of the Cell Theory?",
            options: [
                "All living organisms are made of cells.",
                "Cells are the basic unit of structure and function.",
                "Cells arise from pre-existing cells.",
                "Cells can spontaneously generate in special conditions."
            ], answer: 3
        },
        {
            question: "Which structure is present in all types of cells, both prokaryotic and eukaryotic?",
            options: [
                "Nucleus",
                "Cell membrane",
                "Mitochondria",
                "Endoplasmic reticulum"
            ], answer: 1
        },
        {
            question: "What is the main feature that distinguishes prokaryotic cells from eukaryotic cells?",
            options: [
                "Size of the cell",
                "Presence of a nucleus enclosed by a membrane",
                "Ability to photosynthesize",
                "Ability to reproduce"
            ],
            answer: 1
        },

        {
            question: "Which organelle is responsible for packaging, modifying, and sorting proteins from the ER?",
            options: [
                "Mitochondria",
                "Golgi apparatus",
                "Lysosome",
                "Ribosome"
            ],
            answer: 1
        },

        {
            question: "Ribosomes found in prokaryotes are composed of which subunits?",
            options: [
                "60S + 40S",
                "70S only",
                "50S + 30S",
                "80S only"
            ],
            answer: 2
        },

        {
            question: "Which part of the cell membrane gives it selective permeability and forms the center of the bilayer?",
            options: [
                "Hydrophilic phosphate heads",
                "Hydrophobic fatty acid tails",
                "Carbohydrate chains",
                "Cholesterol molecules"
            ],
            answer: 1
        },

        {
            question: "Which plant organelle contains chlorophyll and is the site of photosynthesis?",
            options: [
                "Mitochondrion",
                "Chromoplast",
                "Chloroplast",
                "Amyloplast"
            ],
            answer: 2
        },
    ],
    [ // Handout 2
        {
            question: "1. Which type of plant tissue is responsible for primary growth, or the increase in length of roots and shoots?",
            options: [
                "Lateral meristem",
                "Intercalary meristem",
                "Apical meristem",
                "Vascular cambium"
            ],
            answer: 2
        },

        {
            question: "2. Which plant tissue type is responsible for transporting water and dissolved minerals?",
            options: [
                "Phloem",
                "Parenchyma",
                "Collenchyma",
                "Xylem"
            ],
            answer: 3
        },

        {
            question: "3. Which of the following is not a characteristic of meristematic cells?",
            options: [
                "Actively dividing",
                "Large central vacuole",
                "Thin cell walls",
                "Dense cytoplasm"
            ],
            answer: 1
        },

        {
            question: "4. Which animal tissue type functions primarily as a protective covering and lining of organs?",
            options: [
                "Nervous tissue",
                "Connective tissue",
                "Epithelial tissue",
                "Muscle tissue"
            ],
            answer: 2
        },

        {
            question: "5. Which type of muscle tissue is involuntary, striated, and found only in the heart?",
            options: [
                "Smooth muscle",
                "Skeletal muscle",
                "Cardiac muscle",
                "Voluntary muscle"
            ],
            answer: 2
        },

        {
            question: "6. Which of the following is not a function of connective tissue?",
            options: [
                "Filling spaces",
                "Transmitting nerve impulses",
                "Protecting organs",
                "Providing flexible support"
            ],
            answer: 1
        },

        {
            question: "7. Which cell type in nervous tissue receives, processes, and transmits information?",
            options: [
                "Schwann cells",
                "Oligodendrocytes",
                "Neuroglia",
                "Neurons"
            ],
            answer: 3
        },

    ],
    [ // Handout 3
        {
            question: "1. Which characteristic of phospholipids allows the plasma membrane to form a bilayer?",
            options: [
                "They are fully hydrophilic",
                "They have both hydrophobic and hydrophilic regions",
                "They are completely nonpolar",
                "They contain no fatty acids"
            ],
            answer: 1
        },

        {
            question: "2. Which component of the plasma membrane is responsible for recognizing self vs. foreign cells?",
            options: [
                "Spectrin",
                "Glycolipids and glycoproteins",
                "Aquaporins",
                "Carrier proteins"
            ],
            answer: 1
        },

        {
            question: "3. Which transport process moves molecules from high to low concentration without energy and without proteins?",
            options: [
                "Active transport",
                "Facilitated diffusion",
                "Simple diffusion",
                "Osmosis"
            ],
            answer: 2
        },

        {
            question: "4. Which structure allows charged ions such as K⁺ or Na⁺ to cross the plasma membrane?",
            options: [
                "Aquaporins",
                "Ion channels",
                "Cell-surface receptors",
                "Identity markers"
            ],
            answer: 1
        },

        {
            question: "5. In animal cells placed in a hypertonic solution, what happens?",
            options: [
                "Water moves into the cell and it bursts",
                "No net movement of water",
                "Water leaves the cell causing it to shrivel",
                "The cell becomes turgid"
            ],
            answer: 2
        },

        {
            question: "6. Which mechanism involves the cell engulfing large particles like bacteria?",
            options: [
                "Pinocytosis",
                "Phagocytosis",
                "Osmosis",
                "Exocytosis"
            ],
            answer: 1
        },

        {
            question: "7. The sodium–potassium pump is an example of which type of transport?",
            options: [
                "Passive transport",
                "Primary active transport",
                "Secondary active transport",
                "Bulk transport"
            ],
            answer: 1
        },

    ],
    [ // Quiz 1
         {
        question: "Which of the following is not part of the Cell Theory?",
        options: [
            "All living organisms are made of cells.",
            "Cells are the basic unit of structure and function.",
            "Cells arise from pre-existing cells.",
            "Cells can spontaneously generate in special conditions."
        ],
        answer: 3
    },
    {
        question: "Which structure is present in all types of cells, both prokaryotic and eukaryotic?",
        options: [
            "Nucleus",
            "Cell membrane",
            "Mitochondria",
            "Endoplasmic reticulum"
        ],
        answer: 1
    },
    {
        question: "What is the main feature that distinguishes prokaryotic cells from eukaryotic cells?",
        options: [
            "Size of the cell",
            "Presence of a nucleus enclosed by a membrane",
            "Ability to photosynthesize",
            "Ability to reproduce"
        ],
        answer: 1
    },
    {
        question: "Which organelle is responsible for packaging, modifying, and sorting proteins from the ER?",
        options: [
            "Mitochondria",
            "Golgi apparatus",
            "Lysosome",
            "Ribosome"
        ],
        answer: 1
    },
    {
        question: "Ribosomes found in prokaryotes are composed of which subunits?",
        options: [
            "60S + 40S",
            "70S only",
            "50S + 30S",
            "80S only"
        ],
        answer: 2
    },
    {
        question: "Which part of the cell membrane gives it selective permeability and forms the center of the bilayer?",
        options: [
            "Hydrophilic phosphate heads",
            "Hydrophobic fatty acid tails",
            "Carbohydrate chains",
            "Cholesterol molecules"
        ],
        answer: 1
    },
    {
        question: "Which plant organelle contains chlorophyll and is the site of photosynthesis?",
        options: [
            "Mitochondrion",
            "Chromoplast",
            "Chloroplast",
            "Amyloplast"
        ],
        answer: 2
    },

    // Handout 2 – Plant & Animal Tissues
    {
        question: "Which type of plant tissue is responsible for primary growth, or the increase in length of roots and shoots?",
        options: [
            "Lateral meristem",
            "Intercalary meristem",
            "Apical meristem",
            "Vascular cambium"
        ],
        answer: 2
    },
    {
        question: "Which plant tissue type is responsible for transporting water and dissolved minerals?",
        options: [
            "Phloem",
            "Parenchyma",
            "Collenchyma",
            "Xylem"
        ],
        answer: 3
    },
    {
        question: "Which of the following is not a characteristic of meristematic cells?",
        options: [
            "Actively dividing",
            "Large central vacuole",
            "Thin cell walls",
            "Dense cytoplasm"
        ],
        answer: 1
    },
    {
        question: "Which animal tissue type functions primarily as a protective covering and lining of organs?",
        options: [
            "Nervous tissue",
            "Connective tissue",
            "Epithelial tissue",
            "Muscle tissue"
        ],
        answer: 2
    },
    {
        question: "Which type of muscle tissue is involuntary, striated, and found only in the heart?",
        options: [
            "Smooth muscle",
            "Skeletal muscle",
            "Cardiac muscle",
            "Voluntary muscle"
        ],
        answer: 2
    },
    {
        question: "Which of the following is not a function of connective tissue?",
        options: [
            "Filling spaces",
            "Transmitting nerve impulses",
            "Protecting organs",
            "Providing flexible support"
        ],
        answer: 1
    },
    {
        question: "Which cell type in nervous tissue receives, processes, and transmits information?",
        options: [
            "Schwann cells",
            "Oligodendrocytes",
            "Neuroglia",
            "Neurons"
        ],
        answer: 3
    },

    // Handout 3 – Membrane & Transport
    {
        question: "Which characteristic of phospholipids allows the plasma membrane to form a bilayer?",
        options: [
            "They are fully hydrophilic",
            "They have both hydrophobic and hydrophilic regions",
            "They are completely nonpolar",
            "They contain no fatty acids"
        ],
        answer: 1
    },
    {
        question: "Which component of the plasma membrane is responsible for recognizing self vs. foreign cells?",
        options: [
            "Spectrin",
            "Glycolipids and glycoproteins",
            "Aquaporins",
            "Carrier proteins"
        ],
        answer: 1
    },
    {
        question: "Which transport process moves molecules from high to low concentration without energy and without proteins?",
        options: [
            "Active transport",
            "Facilitated diffusion",
            "Simple diffusion",
            "Osmosis"
        ],
        answer: 2
    },
    {
        question: "Which structure allows charged ions such as K⁺ or Na⁺ to cross the plasma membrane?",
        options: [
            "Aquaporins",
            "Ion channels",
            "Cell-surface receptors",
            "Identity markers"
        ],
        answer: 1
    },
    {
        question: "In animal cells placed in a hypertonic solution, what happens?",
        options: [
            "Water moves into the cell and it bursts",
            "No net movement of water",
            "Water leaves the cell causing it to shrivel",
            "The cell becomes turgid"
        ],
        answer: 2
    },
    {
        question: "Which mechanism involves the cell engulfing large particles like bacteria?",
        options: [
            "Pinocytosis",
            "Phagocytosis",
            "Osmosis",
            "Exocytosis"
        ],
        answer: 1
    },
    {
        question: "The sodium–potassium pump is an example of which type of transport?",
        options: [
            "Passive transport",
            "Primary active transport",
            "Secondary active transport",
            "Bulk transport"
        ],
        answer: 1
    },

    ],

    [ // Handout 4
        {
            question: "1. What is the first stage of cellular respiration?",
            options: [
                "Krebs Cycle",
                "Glycolysis",
                "Electron Transport Chain",
                "Photosynthesis"
            ],
            answer: 1
        },

        {
            question: "2. Where does glycolysis occur?",
            options: [
                "Mitochondria",
                "Cytoplasm",
                "Nucleus",
                "Chloroplast"
            ],
            answer: 1
        },

        {
            question: "3. What is the final electron acceptor of chemiosmosis?",
            options: [
                "Oxygen",
                "NADH",
                "FADH2",
                "Carbon Dioxide"
            ],
            answer: 0
        },

        {
            question: "4. What are the two major processes of photosynthesis?",
            options: [
                "Light-Dependent Reactions and Light-Independent Reactions",
                "Glycolysis and Krebs Cycle",
                "Electron Transport Chain and Chemiosmosis",
                "Fermentation and Respiration"
            ],
            answer: 0
        },

        {
            question: "5. What is produced during the phosphorylation reaction?",
            options: [
                "Energy",
                "Carbon Dioxide",
                "Glucose",
                "Oxygen"
            ],
            answer: 0
        },

        {
            question: "6. What is produced during the Krebs Cycle?",
            options: [
                "Oxygen",
                "Glucose",
                "ATP",
                "NADH"
            ],
            answer: 3
        },

        {
            question: "7. What is the main reason why the Krebs Cycle is referred to as a cycle?",
            options: [
                "It produces ATP",
                "It recycles molecules",
                "It occurs in the mitochondria",
                "It requires oxygen"
            ],
            answer: 1
        },

    ],
    [ // Handout 5
        {
            question: "1. What is released during decomposition reactions?",
            options: [
                "Energy",
                "Reactants",
                "Products",
                "State symbols"
            ],
            answer: 0
        },

        {
            question: "2. What do the reactants in a chemical equation represent?",
            options: [
                "The products of the reaction",
                "The elements transformed and affected",
                "The conditions of the reaction",
                "The energy released"
            ],
            answer: 1
        },

        {
            question: "3. Which type of reaction involves multiple reactants forming a single product?",
            options: [
                "Decomposition",
                "Displacement",
                "Composition/Synthesis",
                "Reduction-Oxidation"
            ],
            answer: 2
        },

        {
            question: "4. What is indicated by two arrows (⇋) in a chemical equation?",
            options: [
                "The reaction is irreversible",
                "The reaction is forward",
                "The reaction is reversible",
                "The reaction is complete"
            ],
            answer: 2
        },

        {
            question: "5. What are the elements in Group 1 of the periodic table called?",
            options: [
                "Noble gases",
                "Alkali metals",
                "Halogens",
                "Alkali earth metals"
            ],
            answer: 1
        },

        {
            question: "6. What is the main purpose of writing a chemical equation?",
            options: [
                "To show the physical state of compounds",
                "To indicate the direction of the reaction",
                "To see which elements were transformed and affected",
                "To list all the compounds involved"
            ],
            answer: 2
        },

        {
            question: "7. What type of reaction is characterized by one compound being broken down into its constituents?",
            options: [
                "Composition",
                "Decomposition",
                "Displacement",
                "Red-Ox"
            ],
            answer: 1
        },

    ],
    [ // Quiz for Handout 6
        {
            question: "1. What is the main structure of lipids?",
            options: [
                "Glycerol head and fatty acid tail",
                "Amino acids linked by peptide bonds",
                "Nucleotide chains",
                "Carbon and hydrogen bonds"
            ],
            answer: 0
        },

        {
            question: "2. What color indicates a high amount of peptide bonds in the Biuret Test?",
            options: [
                "Light purple",
                "Deep purple",
                "Pink",
                "Blue"
            ],
            answer: 1
        },

        {
            question: "3. What are the two variants of nucleic acids mentioned in the document?",
            options: [
                "DNA and RNA",
                "Proteins and Lipids",
                "Carbohydrates and Proteins",
                "Triglycerides and Phospholipids"
            ],
            answer: 0
        },

        {
            question: "4. What is the function of triglycerides?",
            options: [
                "Energy storage",
                "Structural support",
                "Chemical messengers",
                "Transport"
            ],
            answer: 0
        },

        {
            question: "5. What is the result of a positive Spot Test for lipids?",
            options: [
                "Translucent spot",
                "Blue solution",
                "No spot",
                "Red color"
            ],
            answer: 0
        },

        {
            question: "6. What does the Dische Test identify?",
            options: [
                "Presence of RNA",
                "Presence of DNA",
                "Presence of lipids",
                "Presence of proteins"
            ],
            answer: 1
        },

        {
            question: "7. What is the main structure of lipids?",
            options: [
                "Glycerol head and a fatty acid tail",
                "Amino acids linked by peptide bonds",
                "Nucleotides forming DNA",
                "Carbon and hydrogen bonds"
            ],
            answer: 0
        },

    ],
    [ // Quiz for Quiz 2
        {
        question: "What is the first stage of cellular respiration?",
        options: ["Krebs Cycle", "Glycolysis", "Electron Transport Chain", "Photosynthesis"],
        answer: 1
    },
    {
        question: "Where does glycolysis occur?",
        options: ["Mitochondria", "Cytoplasm", "Nucleus", "Chloroplast"],
        answer: 1
    },
    {
        question: "What is the final electron acceptor of chemiosmosis?",
        options: ["Oxygen", "NADH", "FADH2", "Carbon Dioxide"],
        answer: 0
    },
    {
        question: "What are the two major processes of photosynthesis?",
        options: [
            "Light-Dependent Reactions and Light-Independent Reactions",
            "Glycolysis and Krebs Cycle",
            "Electron Transport Chain and Chemiosmosis",
            "Fermentation and Respiration"
        ],
        answer: 0
    },
    {
        question: "What is produced during the phosphorylation reaction?",
        options: ["Energy", "Carbon Dioxide", "Glucose", "Oxygen"],
        answer: 0
    },
    {
        question: "What is produced during the Krebs Cycle?",
        options: ["Oxygen", "Glucose", "ATP", "NADH"],
        answer: 3
    },
    {
        question: "Why is the Krebs Cycle referred to as a cycle?",
        options: ["It produces ATP", "It recycles molecules", "It occurs in the mitochondria", "It requires oxygen"],
        answer: 1
    },

    // Chemical Reactions & Periodic Table (Handout 5)
    {
        question: "What is released during decomposition reactions?",
        options: ["Energy", "Reactants", "Products", "State symbols"],
        answer: 0
    },
    {
        question: "What do the reactants in a chemical equation represent?",
        options: ["The products of the reaction", "The elements transformed and affected", "The conditions of the reaction", "The energy released"],
        answer: 1
    },
    {
        question: "Which type of reaction involves multiple reactants forming a single product?",
        options: ["Decomposition", "Displacement", "Composition/Synthesis", "Reduction-Oxidation"],
        answer: 2
    },
    {
        question: "What is indicated by two arrows (⇋) in a chemical equation?",
        options: ["The reaction is irreversible", "The reaction is forward", "The reaction is reversible", "The reaction is complete"],
        answer: 2
    },
    {
        question: "What are the elements in Group 1 of the periodic table called?",
        options: ["Noble gases", "Alkali metals", "Halogens", "Alkali earth metals"],
        answer: 1
    },
    {
        question: "What is the main purpose of writing a chemical equation?",
        options: ["To show the physical state of compounds", "To indicate the direction of the reaction", "To see which elements were transformed and affected", "To list all the compounds involved"],
        answer: 2
    },
    {
        question: "Which type of reaction is characterized by one compound being broken down into its constituents?",
        options: ["Composition", "Decomposition", "Displacement", "Red-Ox"],
        answer: 1
    },

    // Macromolecules & Biochemical Tests (Handout 6)
    {
        question: "What is the main structure of lipids?",
        options: ["Glycerol head and fatty acid tail", "Amino acids linked by peptide bonds", "Nucleotide chains", "Carbon and hydrogen bonds"],
        answer: 0
    },
    {
        question: "What color indicates a high amount of peptide bonds in the Biuret Test?",
        options: ["Light purple", "Deep purple", "Pink", "Blue"],
        answer: 1
    },
    {
        question: "What are the two variants of nucleic acids?",
        options: ["DNA and RNA", "Proteins and Lipids", "Carbohydrates and Proteins", "Triglycerides and Phospholipids"],
        answer: 0
    },
    {
        question: "What is the function of triglycerides?",
        options: ["Energy storage", "Structural support", "Chemical messengers", "Transport"],
        answer: 0
    },
    {
        question: "What is the result of a positive Spot Test for lipids?",
        options: ["Translucent spot", "Blue solution", "No spot", "Red color"],
        answer: 0
    },
    {
        question: "What does the Dische Test identify?",
        options: ["Presence of RNA", "Presence of DNA", "Presence of lipids", "Presence of proteins"],
        answer: 1
    },

    ],

    [ // Quiz for Handout 7
        {
            question: "1. What is the term for the structure formed when DNA is wrapped around a histone protein?",
            options: [
                "Chromatid",
                "Chromatin fiber",
                "Nucleosome",
                "Centromere"
            ],
            answer: 2
        },
        {
            question: "2. Which phase of interphase involves the replication of DNA and duplication of the centrosome?",
            options: [
                "G0",
                "G1",
                "S",
                "G2"
            ],
            answer: 2
        },
        {
            question: "3. During which phase of mitosis do the sister chromatids separate and move toward opposite poles of the cell?",
            options: [
                "Prophase",
                "Metaphase",
                "Anaphase",
                "Telophase"
            ],
            answer: 2
        },
        {
            question: "4. What is the primary function of the G2 checkpoint?",
            options: [
                "To check if proteins and energy are accumulated for DNA replication",
                "To evaluate if DNA has been properly replicated and is undamaged",
                "To ensure all sister chromatids are attached to microtubules",
                "To assess cell size and protein reserves before mitosis"
            ],
            answer: 1
        },
        {
            question: "5. Mitosis produces daughter cells that are genetically identical to the parent cell, while meiosis produces haploid cells for reproduction. What is the chromosome designation for human somatic cells?",
            options: [
                "n (haploid)",
                "2n (diploid)",
                "4n (tetraploid)",
                "1n (monoploid)"
            ],
            answer: 1
        },
        {
            question: "6. In Meiosis I, during prophase I, what process involves the exchange of genetic material between homologous chromosomes?",
            options: [
                "Synapsis",
                "Crossing-over/Recombination",
                "Independent assortment",
                "Formation of tetrad"
            ],
            answer: 1
        },
        {
            question: "7. What is the outcome of Meiosis II in terms of the number and type of daughter cells produced?",
            options: [
                "Two diploid cells",
                "Four haploid cells",
                "Two haploid cells",
                "One diploid cell"
            ],
            answer: 1
        },

    ],
    [ // Quiz for Handout 8
        {
        question: "1. What does 'true breeding' mean in the context of Mendel's experiments?",
        options: [
            "Offspring that are hybrids from different species",
            "Offspring identical to the parent after self-fertilization",
            "Offspring that show recessive traits only",
            "Offspring produced by cross-fertilization"
        ],
        answer: 1
    },
    {
        question: "2. In Mendelian genetics, a recessive allele's effect is masked when:",
        options: [
            "It is present in a homozygous state",
            "A dominant allele is also present",
            "Both alleles are identical",
            "The individual is heterozygous"
        ],
        answer: 1
    },
    {
        question: "3. What is the genotype of an individual that is heterozygous for a trait, such as Gg?",
        options: [
            "Homozygous dominant",
            "Homozygous recessive",
            "Contains different alleles and shows dominant traits",
            "Contains identical alleles and shows recessive traits"
        ],
        answer: 2
    },
    {
        question: "4. According to the Law of Segregation, alleles for the same trait:",
        options: [
            "Influence each other during segregation",
            "Separate and are packaged into different gametes",
            "Always assort independently",
            "Remain together in the same gamete"
        ],
        answer: 1
    },
    {
        question: "5. In a monohybrid cross between two heterozygous individuals (e.g., Yy x Yy), what is the phenotypic ratio in the F2 generation?",
        options: [
            "1:1",
            "1:2:1",
            "3:1",
            "9:3:3:1"
        ],
        answer: 2
    },
    {
        question: "6. For a dihybrid cross (e.g., Rg rg x rG Rg), what is the phenotypic ratio in the F2 generation?",
        options: [
            "3:1",
            "1:2:1",
            "9:3:3:1",
            "1:1:1:1"
        ],
        answer: 2
    },
    {
        question: "7. A test-cross is used to determine the genotype of an individual by crossing it with:",
        options: [
            "Another heterozygous individual",
            "A homozygous dominant individual",
            "A homozygous recessive individual",
            "Its own parent"
        ],
        answer: 2
    },

    ], [ // Quiz for Quiz 3
        {
        question: "What is the term for the structure formed when DNA is wrapped around a histone protein?",
        options: [
            "Chromatid",
            "Chromatin fiber",
            "Nucleosome",
            "Centromere"
        ],
        answer: 2
    },
    {
        question: "Which phase of interphase involves the replication of DNA and duplication of the centrosome?",
        options: [
            "G0",
            "G1",
            "S",
            "G2"
        ],
        answer: 2
    },
    {
        question: "During which phase of mitosis do the sister chromatids separate and move toward opposite poles of the cell?",
        options: [
            "Prophase",
            "Metaphase",
            "Anaphase",
            "Telophase"
        ],
        answer: 2
    },
    {
        question: "What is the primary function of the G2 checkpoint?",
        options: [
            "To check if proteins and energy are accumulated for DNA replication",
            "To evaluate if DNA has been properly replicated and is undamaged",
            "To ensure all sister chromatids are attached to microtubules",
            "To assess cell size and protein reserves before mitosis"
        ],
        answer: 1
    },
    {
        question: "Mitosis produces daughter cells that are genetically identical to the parent cell, while meiosis produces haploid cells for reproduction. What is the chromosome designation for human somatic cells?",
        options: [
            "n (haploid)",
            "2n (diploid)",
            "4n (tetraploid)",
            "1n (monoploid)"
        ],
        answer: 1
    },
    {
        question: "In Meiosis I, during prophase I, what process involves the exchange of genetic material between homologous chromosomes?",
        options: [
            "Synapsis",
            "Crossing-over/Recombination",
            "Independent assortment",
            "Formation of tetrad"
        ],
        answer: 1
    },
    {
        question: "What is the outcome of Meiosis II in terms of the number and type of daughter cells produced?",
        options: [
            "Two diploid cells",
            "Four haploid cells",
            "Two haploid cells",
            "One diploid cell"
        ],
        answer: 1
    },

    // Handout 8 – Mendelian Genetics
    {
        question: "What does 'true breeding' mean in the context of Mendel's experiments?",
        options: [
            "Offspring that are hybrids from different species",
            "Offspring identical to the parent after self-fertilization",
            "Offspring that show recessive traits only",
            "Offspring produced by cross-fertilization"
        ],
        answer: 1
    },
    {
        question: "In Mendelian genetics, a recessive allele's effect is masked when:",
        options: [
            "It is present in a homozygous state",
            "A dominant allele is also present",
            "Both alleles are identical",
            "The individual is heterozygous"
        ],
        answer: 1
    },
    {
        question: "What is the genotype of an individual that is heterozygous for a trait, such as Gg?",
        options: [
            "Homozygous dominant",
            "Homozygous recessive",
            "Contains different alleles and shows dominant traits",
            "Contains identical alleles and shows recessive traits"
        ],
        answer: 2
    },
    {
        question: "According to the Law of Segregation, alleles for the same trait:",
        options: [
            "Influence each other during segregation",
            "Separate and are packaged into different gametes",
            "Always assort independently",
            "Remain together in the same gamete"
        ],
        answer: 1
    },
    {
        question: "In a monohybrid cross between two heterozygous individuals (e.g., Yy x Yy), what is the phenotypic ratio in the F2 generation?",
        options: [
            "1:1",
            "1:2:1",
            "3:1",
            "9:3:3:1"
        ],
        answer: 2
    },
    {
        question: "For a dihybrid cross (e.g., Rg rg x rG Rg), what is the phenotypic ratio in the F2 generation?",
        options: [
            "3:1",
            "1:2:1",
            "9:3:3:1",
            "1:1:1:1"
        ],
        answer: 2
    },
    {
        question: "A test-cross is used to determine the genotype of an individual by crossing it with:",
        options: [
            "Another heterozygous individual",
            "A homozygous dominant individual",
            "A homozygous recessive individual",
            "Its own parent"
        ],
        answer: 2
    },

    // Additional Genetics & Cell Cycle Questions to reach 21
    {
        question: "What is the primary function of the nuclear envelope in a eukaryotic cell?",
        options: [
            "To synthesize proteins",
            "To enclose the nucleus and regulate material exchange",
            "To produce energy through respiration",
            "To store genetic material in a compact form"
        ],
        answer: 1
    },
    {
        question: "During which phase of the cell cycle does chromatin condense into visible chromosomes?",
        options: [
            "Interphase",
            "Prophase of mitosis",
            "Anaphase of mitosis",
            "Telophase of mitosis"
        ],
        answer: 1
    },
    {
        question: "In metaphase of mitosis, what key event occurs at the cell's equator?",
        options: [
            "Chromosomes align along the metaphase plate",
            "Sister chromatids separate",
            "Nuclear envelope reforms",
            "Cytokinesis begins"
        ],
        answer: 0
    },
    {
        question: "During prophase I of meiosis, homologous chromosomes pair up and may exchange genetic material through:",
        options: [
            "Synapsis",
            "Crossing-over",
            "Independent assortment",
            "Segregation"
        ],
        answer: 1
    },
    {
        question: "Gregor Mendel established basic inheritance patterns by experimenting on:",
        options: [
            "Fruit flies",
            "Pea plants",
            "Mice",
            "Humans"
        ],
        answer: 1
    },
    {
        question: "The Law of Segregation states that alleles for a trait:",
        options: [
            "Always stay together",
            "Separate into different gametes",
            "Influence each other during assortment",
            "Are only expressed in dominant form"
        ],
        answer: 1
    },

    ]
];

export const allQuizzes2 = [
    [ // Handout 1
        {
            question: "1. What is the fundamental definition of matter?",
            options: [
                "Anything that has color and shape",
                "Anything that has mass and occupies space",
                "Anything that conducts electricity",
                "Anything that is visible to the naked eye"
            ], answer: 1
        },
        {
            question: "2. Which state of matter is characterized by particles that are loosely bonded and move freely, with negligible intermolecular forces?",
            options: [
                "Solid",
                "Liquid",
                "Gas",
                "Plasma"
            ], answer: 2
        },
        {
            question: "3. An intensive property that does not depend on the amount of matter is:",
            options: [
                "Mass",
                "Volume",
                "Density",
                "Length"
            ], answer: 2
        },
        {
            question: "4. Which of the following is an example of a chemical property?",
            options: [
                "Color",
                "Flammability",
                "Density",
                "Melting point"
            ], answer: 1
        },
        {
            question: "5. A pure substance that consists of only one type of atom is called:",
            options: [
                "Compound",
                "Mixture",
                "Element",
                "Solution"
            ], answer: 2
        },
        {
            question: "6. A heterogeneous mixture can be separated by:",
            options: [
                "Chemical reactions only",
                "Physical means, such as filtration",
                "Heating to high temperatures",
                "Adding acids"
            ], answer: 1
        },
        {
            question: "7. In writing the formula for magnesium chloride (MgCl₂), the valency of magnesium (2+) and chlorine (-1) results in:",
            options: [
                "MgCl",
                "Mg₂Cl",
                "MgCl₂",
                "MgCl₃"
            ], answer: 2
        }

    ],
    [ // Handout 2
        {
            question: "1. Which of the following best describes precision?",
            options: [
                "How close a measurement is to the true value",
                "The consistency of multiple measurements",
                "The degree of exactness in a measurement",
                "The ability to measure without error"
            ], answer: 1
        },
        {
            question: "2. What does the prefix 'kilo' represent in the metric system?",
            options: [
                "10^9",
                "10^6",
                "10^3",
                "10^-3"
            ], answer: 2
        },
        {
            question: "3. Convert 1 yard to meters using the conversion factor 1 yd = 0.9144 m.",
            options: [
                "0.9144 m",
                "1.0936 m",
                "0.001 m",
                "914.4 m"
            ], answer: 0
        },
        {
            question: "4. What is the SI unit for mass?",
            options: [
                "Meter (m)",
                "Kilogram (kg)",
                "Second (s)",
                "Ampere (A)"
            ], answer: 1
        },
        {
            question: "5. How many significant figures are in the number 0.002806?",
            options: [
                "2",
                "4",
                "5",
                "6"
            ], answer: 1
        },
        {
            question: "6. What is the density of a substance if its mass is 100 g and its volume is 50 cm³?",
            options: [
                "0.5 g/cm³",
                "2 g/cm³",
                "5 g/cm³",
                "50 g/cm³"
            ], answer: 1
        },
        {
            question: "7. Density is a derived unit expressed as mass per unit volume. For liquids, it is often given in:",
            options: [
                "g/m³",
                "kg/L",
                "mg/cm³",
                "lb/ft³"
            ], answer: 1
        }


    ],
    [ // Handout 3
        {
            question: "1. What is the charge of a cation?",
            options: [
                "Negative",
                "Positive",
                "Neutral",
                "Variable depending on the element"
            ], answer: 1
        },
        {
            question: "2. Which of the following is the correct name for the ion with the symbol Cl⁻?",
            options: [
                "Chlorine",
                "Chloride",
                "Chlorate",
                "Chlorite"
            ], answer: 1
        },
        {
            question: "3. What is the formula for the sulfate ion?",
            options: [
                "SO₃²⁻",
                "SO₄²⁻",
                "SO₃⁻",
                "SO₄⁻"
            ], answer: 1
        },
        {
            question: "4. What is the name of the compound with the formula NaCl?",
            options: [
                "Sodium chlorate",
                "Sodium chloride",
                "Sodium chlorite",
                "Sodium hypochlorite"
            ], answer: 1
        },
        {
            question: "5. What is the name of the compound with the formula Ca(NO₃)₂?",
            options: [
                "Calcium nitrite",
                "Calcium nitrate",
                "Calcium sulfate",
                "Calcium phosphate"
            ], answer: 1
        },
        {
            question: "6. For iron, the ion Fe²⁺ is named:",
            options: [
                "Iron (III)",
                "Ferric",
                "Iron (II)",
                "Ferrous"
            ], answer: 2
        },
        {
            question: "7. What is the name of the compound NH₄Cl?",
            options: [
                "Nitrogen chloride",
                "Ammonium chloride",
                "Hydrogen chloride",
                "Nitrogen hydride chloride"
            ], answer: 1
        }


    ],
    [ // Quiz 1
        {
            question: "1. What is the primary function of the nuclear envelope in a eukaryotic cell?",
            options: [
                "To synthesize proteins",
                "To enclose the nucleus and regulate material exchange",
                "To produce energy through respiration",
                "To store genetic material in a compact form"
            ], answer: 1
        },
        {
            question: "2. During which phase of the cell cycle does chromatin condense into visible chromosomes?",
            options: [
                "Interphase",
                "Prophase of mitosis",
                "Anaphase of mitosis",
                "Telophase of mitosis"
            ], answer: 1
        },
        {
            question: "3. In metaphase of mitosis, what key event occurs at the cell's equator?",
            options: [
                "Chromosomes align along the metaphase plate",
                "Sister chromatids separate",
                "Nuclear envelope reforms",
                "Cytokinesis begins"
            ], answer: 0
        },
        {
            question: "4. During prophase I of meiosis, homologous chromosomes pair up and may exchange genetic material through:",
            options: [
                "Synapsis",
                "Crossing-over",
                "Independent assortment",
                "Segregation"
            ], answer: 1
        },
        {
            question: "5. Gregor Mendel established basic inheritance patterns by experimenting on:",
            options: [
                "Fruit flies",
                "Pea plants",
                "Mice",
                "Humans"
            ], answer: 1
        },
        {
            question: "6. The Law of Segregation states that alleles for a trait:",
            options: [
                "Always stay together",
                "Separate into different gametes",
                "Influence each other during assortment",
                "Are only expressed in dominant form"
            ], answer: 1
        },
        {
            question: "7. A dihybrid cross (e.g., RG rg x rG Rg) results in an F2 phenotypic ratio of:",
            options: [
                "3:1",
                "1:2:1",
                "9:3:3:1",
                "1:1:1:1"
            ], answer: 2
        },
        {
            question: "8. What is the fundamental definition of matter?",
            options: [
                "Anything that has color and shape",
                "Anything that has mass and occupies space",
                "Anything that conducts electricity",
                "Anything that is visible to the naked eye"
            ], answer: 1
        },
        {
            question: "9. Which state of matter is characterized by particles that are loosely bonded and move freely, with negligible intermolecular forces?",
            options: [
                "Solid",
                "Liquid",
                "Gas",
                "Plasma"
            ], answer: 2
        },
        {
            question: "10. An intensive property that does not depend on the amount of matter is:",
            options: [
                "Mass",
                "Volume",
                "Density",
                "Length"
            ], answer: 2
        },
        {
            question: "11. Which of the following is an example of a chemical property?",
            options: [
                "Color",
                "Flammability",
                "Density",
                "Melting point"
            ], answer: 1
        },
        {
            question: "12. A pure substance that consists of only one type of atom is called:",
            options: [
                "Compound",
                "Mixture",
                "Element",
                "Solution"
            ], answer: 2
        },
        {
            question: "13. A heterogeneous mixture can be separated by:",
            options: [
                "Chemical reactions only",
                "Physical means, such as filtration",
                "Heating to high temperatures",
                "Adding acids"
            ], answer: 1
        },
        {
            question: "14. In writing the formula for magnesium chloride (MgCl₂), the valency of magnesium (2+) and chlorine (-1) results in:",
            options: [
                "MgCl",
                "Mg₂Cl",
                "MgCl₂",
                "MgCl₃"
            ], answer: 2
        },
        {
            question: "15. Which of the following best describes precision?",
            options: [
                "How close a measurement is to the true value",
                "The consistency of multiple measurements",
                "The degree of exactness in a measurement",
                "The ability to measure without error"
            ], answer: 1
        },
        {
            question: "16. What does the prefix 'kilo' represent in the metric system?",
            options: [
                "10^9",
                "10^6",
                "10^3",
                "10^-3"
            ], answer: 2
        },
        {
            question: "17. What is the SI unit for mass?",
            options: [
                "Meter (m)",
                "Kilogram (kg)",
                "Second (s)",
                "Ampere (A)"
            ], answer: 1
        },
        {
            question: "18. How many significant figures are in the number 0.002806?",
            options: [
                "2",
                "4",
                "5",
                "6"
            ], answer: 1
        },
        {
            question: "19. What is the charge of a cation?",
            options: [
                "Negative",
                "Positive",
                "Neutral",
                "Variable depending on the element"
            ], answer: 1
        },
        {
            question: "20. What is the formula for the sulfate ion?",
            options: [
                "SO₃²⁻",
                "SO₄²⁻",
                "SO₃⁻",
                "SO₄⁻"
            ], answer: 1
        },
        {
            question: "21. What is the name of the compound with the formula NaCl?",
            options: [
                "Sodium chlorate",
                "Sodium chloride",
                "Sodium chlorite",
                "Sodium hypochlorite"
            ], answer: 1
        }


    ],

    [ // Handout 4
        {
            question: "1. A whole number represents the number of protons and neutrons in an atom.",
            options: [
                "Mole",
                "Mass Number",
                "Atomic Mass",
                "Reactants"
            ], answer: 1
        },
        {
            question: "2. Is a process in which a substance or substances are changed into one or more new substances.",
            options: [
                "Chemical Reaction",
                "Percent Composition",
                "Decomposition Reaction",
                "Synthesis Reaction"
            ], answer: 0
        },
        {
            question: "3. Examines the quantitative relationship between reactants and products in chemical processes.",
            options: [
                "Chemistry",
                "Biology",
                "Stoichiometry",
                "Organic chemistry"
            ], answer: 2
        },
        {
            question: "4. The mass of a substance contains how many particles.",
            options: [
                "6.022 x 10^23",
                "6.023 x 10^23",
                "6.022 x 10^22",
                "6.032 x 10^23"
            ], answer: 0
        },
        {
            question: "5. Reactants (starting substances) are placed on the left side. _______ (substances produced) are placed on the right.",
            options: [
                "Mass",
                "Compound",
                "Product",
                "Result"
            ], answer: 2
        },
        {
            question: "6. A hydrocarbon (a compound containing carbon and hydrogen) reacts with oxygen to form carbon dioxide and water.",
            options: [
                "Double displacement",
                "Combustion Reaction",
                "Single displacement",
                "Synthesis Reaction"
            ], answer: 1
        },
        {
            question: "7. The percent composition of any element E is calculated as:",
            options: [
                "%E = mass of E / mass of sample × 100%",
                "%E = mass of E / mass of sample / 100%",
                "%E = mass of E / mass of sample + 100%",
                "E = mass of E / mass of sample × 100%"
            ], answer: 0
        }


    ],
    [ // Handout 5
        {
            question: "1. The volume of a given amount of gas is inversely proportional to its pressure at constant temperature.",
            options: [
                "Boyle’s Law",
                "Charle’s Law",
                "Avogrado’s Law",
                "Dalton’s Law"
            ], answer: 0
        },
        {
            question: "2. The universal value of STP is ____ atm (pressure) and 0-degree C.",
            options: [
                "1",
                "2",
                "3",
                "4"
            ], answer: 0
        },
        {
            question: "3. The ideal gas law assumes that all gases behave identically and that their behavior is independent of attractive and repulsive forces.",
            options: [
                "Boyle’s Law",
                "Charle’s Law",
                "Avogrado’s Law",
                "Dalton’s Law"
            ], answer: 3
        },
        {
            question: "4. Is a fundamental concept in chemistry that explains the behavior of matter.",
            options: [
                "Ideal Gas Law",
                "Kinetic Molecular Theory",
                "Gas Stoichiometry",
                "Gas Laws"
            ], answer: 1
        },
        {
            question: "5. The volume of a gas at a given temperature pressure is directly proportional to the number of moles contained in the volume.",
            options: [
                "Boyle’s Law",
                "Charle’s Law",
                "Avogrado’s Law",
                "Dalton’s Law"
            ], answer: 2
        },
        {
            question: "6. It enables us to compute the stoichiometry of reactions that involve gases, provided we know the pressure and temperature.",
            options: [
                "Ideal Gas Law",
                "Kinetic Molecular Theory",
                "Gas Stoichiometry",
                "Gas Laws"
            ], answer: 0
        },
        {
            question: "7. Gas particles are in ________, random motion.",
            options: [
                "Static",
                "Continuous",
                "Scattered",
                "Packed"
            ], answer: 1
        }


    ],
    [ // Quiz for Handout 6
        {
            question: "1. Refers to how electrons are arranged within an atom.",
            options: [
                "Electron Configuration",
                "Electronic structure",
                "Quantum Numbers",
                "Photoelectric Effect"
            ], answer: 1
        },
        {
            question: "2. He suggested that electrons do not emit energy while orbiting the nucleus but instead exist in stationary states with constant energy.",
            options: [
                "Rutherford",
                "Bohr",
                "Hund",
                "Aufbau"
            ], answer: 1
        },
        {
            question: "3. Describe the position and energy of the electron in an atom.",
            options: [
                "Electron Configuration",
                "Electronic structure",
                "Quantum Numbers",
                "Photoelectric Effect"
            ], answer: 2
        },
        {
            question: "4. Indicates the subshell in which an electron can be found. It corresponds to the shape of the orbital.",
            options: [
                "Principal Quantum Number",
                "Azimuthal",
                "Magnetic quantum number",
                "Electron spin quantum number"
            ], answer: 1
        },
        {
            question: "5. A phenomenon in which electrons are ejected from the surface of certain metals exposed to light of at least a certain minimum frequency.",
            options: [
                "Aufbau Principle",
                "Pauli Exclusion Principle",
                "Planck’s Quantum Theory",
                "Photoelectric Effect"
            ], answer: 3
        },
        {
            question: "6. Describes the orientation in space of a particular orbital.",
            options: [
                "Principal Quantum Number",
                "Azimuthal",
                "Magnetic quantum number",
                "Electron spin quantum number"
            ], answer: 2
        },
        {
            question: "7. It describes the atom in a model wherein the center is a nucleus composed of protons and neutrons, which contain most of its mass.",
            options: [
                "Rutherford",
                "Bohr",
                "Hund",
                "Aufbau"
            ], answer: 0
        }


    ],
    [ // Quiz for Quiz 2
        {
            question: "1. What particle has a positive charge?",
            options: [
                "Electron",
                "Neutron",
                "Proton",
                "Atom"
            ], answer: 2
        },
        {
            question: "2. What do you call the center of an atom?",
            options: [
                "Orbit",
                "Nucleus",
                "Shell",
                "Core"
            ], answer: 1
        },
        {
            question: "3. Which particle orbits the nucleus?",
            options: [
                "Proton",
                "Neutron",
                "Electron",
                "Ion"
            ], answer: 2
        },
        {
            question: "4. What is the outermost shell of an atom called?",
            options: [
                "Core shell",
                "Main shell",
                "Valence shell",
                "Proton shell"
            ], answer: 2
        },
        {
            question: "5. Which law states that volume is inversely proportional to pressure?",
            options: [
                "Charles’ Law",
                "Gay-Lussac’s Law",
                "Boyle’s Law",
                "Avogadro’s Law"
            ], answer: 2
        },
        {
            question: "6. What is the SI unit of temperature used in gas laws?",
            options: [
                "Celsius",
                "Fahrenheit",
                "Kelvin",
                "Pascal"
            ], answer: 2
        },
        {
            question: "7. At STP, 1 mole of gas occupies how many liters?",
            options: [
                "2.24 L",
                "22.4 L",
                "224 L",
                "0.224 L"
            ], answer: 1
        },
        {
            question: "8. Which law states that gases in a mixture each exert their own partial pressure?",
            options: [
                "Boyle’s Law",
                "Dalton’s Law",
                "Charles’ Law",
                "Kinetic Law"
            ], answer: 1
        },
        {
            question: "9. What does the symbol “n” represent in the ideal gas law PV = nRT?",
            options: [
                "Volume",
                "Temperature",
                "Pressure",
                "Moles of gas"
            ], answer: 3
        },
        {
            question: "10. What rule states that electrons fill the lowest-energy orbital first?",
            options: [
                "Hund’s Rule",
                "Pauli Exclusion Principle",
                "Aufbau Principle",
                "Bohr’s Theory"
            ], answer: 2
        },
        {
            question: "11. What is the electron configuration of carbon (Z = 6)?",
            options: [
                "1s²",
                "1s² 2s² 2p²",
                "1s² 2s² 2p³",
                "1s² 2s¹"
            ], answer: 1
        },
        {
            question: "12. Which quantum number indicates the energy level?",
            options: [
                "l",
                "ml",
                "ms",
                "n"
            ], answer: 3
        },
        {
            question: "13. What is the value of the spin quantum number (ms)?",
            options: [
                "0 only",
                "+1 and –1",
                "+½ or –½",
                "1, 0, –1"
            ], answer: 2
        },
        {
            question: "14. Which reaction type involves one element replacing another?",
            options: [
                "Synthesis",
                "Decomposition",
                "Single displacement",
                "Double displacement"
            ], answer: 2
        },
        {
            question: "15. What kind of reaction is CH₄ + O₂ → CO₂ + H₂O?",
            options: [
                "Synthesis",
                "Combustion",
                "Decomposition",
                "Double displacement"
            ], answer: 1
        },
        {
            question: "16. What do you call substances on the left side of a chemical equation?",
            options: [
                "Products",
                "Reactants",
                "Catalysts",
                "Coefficients"
            ], answer: 1
        },
        {
            question: "17. Avogadro’s number is equal to:",
            options: [
                "3.14",
                "6.022 × 10²³ particles/mol",
                "1.602 × 10⁻¹⁹",
                "1000"
            ], answer: 1
        },
        {
            question: "18. What does percent composition measure?",
            options: [
                "Size of molecule",
                "Ratio of elements by number",
                "Ratio of elements by mass",
                "Density of compound"
            ], answer: 2
        },
        {
            question: "19. What do you call an atom that gains or loses electrons?",
            options: [
                "Isotope",
                "Ion",
                "Element",
                "Proton"
            ], answer: 1
        },
        {
            question: "20. Which shape belongs to p-orbitals?",
            options: [
                "Spherical",
                "Dumbbell-shaped",
                "Cloverleaf",
                "Ring-like"
            ], answer: 1
        },
        {
            question: "21. According to Kinetic Molecular Theory, gas particles move:",
            options: [
                "Slowly and orderly",
                "In fixed patterns",
                "Randomly and constantly",
                "Not at all"
            ], answer: 2
        }

    ],
];

allQuizzes.forEach(handout => {
    handout.forEach(q => {
        q.question = q.question.replace(/^\d+\.\s*/, "");
    });
});

allQuizzes2.forEach(handout => {
    handout.forEach(q => {
        q.question = q.question.replace(/^\d+\.\s*/, "");
    });
});


// Get current grade and quiz index from localStorage
const currentGrade = localStorage.getItem("currentGrade") || "11";
const currentQuizIndex = Number(localStorage.getItem(`currentQuizIndex_${currentGrade}`)) || 0;

// Select correct quiz array
const quizzesArray = currentGrade === "11" ? allQuizzes : allQuizzes2;
const quizData = quizzesArray[currentQuizIndex];

if (!quizData) {
    console.error("Quiz not found:", currentGrade, currentQuizIndex);
} else {
    loadQuestion(0); // load first question of this quiz
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleQuestionOptions(question) {
    const options = [...question.options]; // copy options
    const correctAnswer = options[question.answer]; // save correct answer text

    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Update question options
    question.options = options;
    // Update correct answer index
    question.answer = options.findIndex(opt => opt === correctAnswer);
}
// Now the rest of your code (currentQuestion, HealthBar, form submission) works as before


// Update hearts
function updateHearts(health) {
    HealthBar.forEach((card, index) => {
        card.style.backgroundImage = `url(${index < health ? heartFull : heartEmpty})`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
    });
}

function loadQuestion(index) {
    const q = quizData[index];
    if (!q) {
        console.error("Tried to load question that does not exist:", index);
        return;
    }

    document.querySelector(".grayitem").classList.add("active");
    document.getElementById("question").textContent = q.question;

    const labels = document.querySelectorAll("#quizForm label");
    labels.forEach((label, i) => label.textContent = q.options[i]);

    const radios = document.querySelectorAll("#quizForm input[type=radio]");
    radios.forEach(r => r.checked = false);
}
function updateProgressBar() {
    const bar = document.getElementById("QuizProgressBar");
    if (!bar) return;

    const percent = Math.floor((currentQuestion / quizData.length) * 100);
    bar.style.width = percent + "%";
}



document.addEventListener("DOMContentLoaded", () => {
    shuffleArray(quizData);
    quizData.forEach(q => shuffleQuestionOptions(q));

    currentHealth = maxHealth;
    updateHearts(currentHealth);
    updateProgressBar();
    loadQuestion(currentQuestion);
});

function showOverlay(message, callback = null) {
    const overlay = document.getElementById("QuizOverlay");
    const msg = document.getElementById("OverlayMessage");

    msg.textContent = message;
    
    overlay.classList.remove("hidden");
    const btn = document.getElementById("OverlayButton");
    btn.onclick = () => {
        overlay.classList.add("hidden");
        if (callback) callback();
    };
}


document.getElementById("quizForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const selected = document.querySelector('input[name="js_string"]:checked');
    if (!selected) {
        showOverlay("Please Select an Answer!");
        return;
    }

    const answerIndex = parseInt(selected.value) - 1;

    if (answerIndex === quizData[currentQuestion].answer) {
        showOverlay("Correct!", () => {
            currentQuestion++;
            updateProgressBar();

            if (currentQuestion < quizData.length) {
                loadQuestion(currentQuestion);
            } else {
                finishQuiz();
            }
        });

    } else {
        showOverlay("Wrong!", () => {
            
            currentHealth--;
            updateHearts(currentHealth);

            if (currentHealth > 0) {
                currentQuestion++;
                updateProgressBar();

                if (currentQuestion < quizData.length) {
                    loadQuestion(currentQuestion);
                } else {
                    finishQuiz();
                }
            } else {
                showOverlay("Game Over! Restarting Quiz", () => {
                    currentQuestion = 0;
                    currentHealth = maxHealth;
                    shuffleArray(quizData);
                    quizData.forEach(q => shuffleQuestionOptions(q));
                    updateHearts(currentHealth);
                    loadQuestion(currentQuestion);
                    updateProgressBar();
                });
            }
        });
    }

    // ❌ REMOVE this line:
    // currentQuestion++;
});

async function finishQuiz() {
    const uid = localStorage.getItem("currentUID") || "guest";
    const currentGrade = localStorage.getItem("currentGrade") || "11";
    const quizIndex = Number(localStorage.getItem(`currentQuizIndex_${currentGrade}`) || 0);

    const completedIndex = Number(localStorage.getItem(`completedIndex_${uid}_grade${currentGrade}`) || 0);
    const isReplay = localStorage.getItem("isReplay") === "1";

    if (currentHealth > 0) {
        showOverlay("Quiz Completed!");
        if (!isReplay && quizIndex >= completedIndex) {
            localStorage.setItem(`completedIndex_${uid}_grade${currentGrade}`, quizIndex + 1);
            const expValue = Number(localStorage.getItem("currentQuizExp") || 10);
            await addRewards(expValue, `quiz_${quizIndex}`);
        }
        localStorage.removeItem("currentQuizExp");
        localStorage.removeItem(`currentQuizIndex_${currentGrade}`);
        localStorage.removeItem("isReplay");

        // Redirect to home page
        window.location.href = "UserCompleteTab.html";
    } else {
        showOverlay("Quiz failed! Restarting Quiz");
        window.location.href = "UserCompleteTab.html";
    }
}


const homebtn = document.querySelector('.stemquest');
if (homebtn) homebtn.addEventListener('click', () => {
    window.location.href = "UserCompleteTab.html"; // only navigate home
});

