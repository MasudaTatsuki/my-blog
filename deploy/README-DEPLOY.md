# GCP Cloud Build + Cloud Deploy (Cloud Run) for myblog

This setup builds a container with Cloud Build, stores it in Artifact Registry, and delivers to Cloud Run via Cloud Deploy across `dev` -> `prod`.

## Prereqs
- gcloud CLI authenticated and set to your project
- A Dockerfile at repo root that builds and serves on port 8080

## Enable APIs
gcloud services enable artifactregistry.googleapis.com run.googleapis.com cloudbuild.googleapis.com clouddeploy.googleapis.com

## Variables
setx PROJECT_ID <your-project-id>
setx REGION asia-northeast1
setx AR_REPO myblog

## Create Artifact Registry
gcloud artifacts repositories create %AR_REPO% --repository-format=docker --location=%REGION% --description="myblog images"

## Create Cloud Deploy pipeline + targets
REM Update PROJECT_ID and REGION placeholders in the two target files before applying
gcloud deploy apply --file=deploy\clouddeploy\pipeline.yaml --region=%REGION% --project=%PROJECT_ID%
gcloud deploy apply --file=deploy\clouddeploy\targets\dev.yaml --region=%REGION% --project=%PROJECT_ID%
gcloud deploy apply --file=deploy\clouddeploy\targets\prod.yaml --region=%REGION% --project=%PROJECT_ID%

## IAM (minimum roles)
- Cloud Build Service Account (PROJECT_NUMBER@cloudbuild.gserviceaccount.com):
  - roles/clouddeploy.releaser
  - roles/clouddeploy.jobRunner
  - roles/run.admin
  - roles/iam.serviceAccountUser
  - roles/artifactregistry.writer

Example:
gcloud projects add-iam-policy-binding %PROJECT_ID% ^
  --member=serviceAccount:%PROJECT_NUMBER%@cloudbuild.gserviceaccount.com ^
  --role=roles/clouddeploy.releaser

Repeat for each role above.

## Create a manual build (test)
gcloud builds submit --config deploy\cloudbuild.yaml --substitutions _REGION=%REGION%,_AR_REPO=%AR_REPO%

This will:
1) Build and push `%REGION%-docker.pkg.dev/%PROJECT_ID%/%AR_REPO%/myblog:$SHORT_SHA`
2) Create a Cloud Deploy release and render using `deploy/skaffold.yaml`
3) Roll out to `dev`, then you can promote to `prod` from the Cloud Deploy UI or CLI

## Trigger (optional)
Create a Cloud Build trigger (GitHub/Cloud Source Repos) on `main` branch to run `deploy/cloudbuild.yaml`.

