# GCP ACE Study Lab — Primary Study Guide + Labs

A React/Vite learning app. Google Cloud-inspired interface; not affiliated with Google.

## What is included

- **12 full-length study lessons** with mental models, real-world examples, troubleshooting checks, read-only CLI inspection suggestions, exam distinctions and retrieval questions.
- **10 interactive simulated labs**: 6 troubleshooting investigations and 4 requirements-to-services design challenges, across guided and advanced difficulty.
- **54 existing multiple-choice questions** with explanations and review filters.
- **14 CLI training challenges** from Linux navigation to GCP inventory, logs, IAM inspection, and a simulated authenticated Cloud Run deployment. Guided and independent modes, explanations, command checks and simulated outputs.
- Local browser progress for lessons, labs, CLI training and quizzes.

The seven uploaded practice-test transcripts are **not** individually verified or transformed into new quiz questions in this rebuild. The original 54-question active bank was retained.

## Ubuntu: update the EXISTING project

Unzip the flat-root rebuild archive **into the directory that already contains package.json**. For the folder path shown in your previous terminal:

```bash
cd ~/Desktop/dev-projects/gcp-ace-study-lab/gcp-ace-study-lab
unzip -o ~/Downloads/gcp-ace-study-lab-cli.zip -d .
ls package.json src/App.jsx src/data/deepLessons.js
npm install
npm run dev
```

Open the localhost URL shown by Vite (usually http://localhost:5173). **Do not unzip into the parent folder**, or you'll recreate the previous nested-directory problem.

If starting from scratch, create a new directory and extract there:

```bash
mkdir -p ~/Desktop/dev-projects/gcp-ace-study-lab-new
unzip ~/Downloads/gcp-ace-study-lab-cli.zip -d ~/Desktop/dev-projects/gcp-ace-study-lab-new
cd ~/Desktop/dev-projects/gcp-ace-study-lab-new
npm install
npm run dev
```

## Notes

- Lessons contain practical guidance for learning. Check the current official Google Cloud docs before making production changes.
- Simulated lab decisions do not create cloud resources. Console and CLI companion steps are optional; live resource creation can incur charges.
- Progress is saved to localStorage at `ace-study-react-v1`, reusing your earlier local records in the same browser/origin.
- Use `npm run build` for a production build. The package install/build could not be run inside this artifact environment because registry DNS was unavailable; source JSX parsing and data checks were performed instead.
