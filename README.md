
# Valentine's Day Memory App 💖

A beautiful, personalized web application to store and cherish your memories.

## Features
- 🌸 **Romantic Design**: Floating hearts background and Valentine's color palette.
- 📸 **Memory Timeline**: Upload photos and videos with dates and descriptions.
- ☁️ **Cloud Storage**: Your memories are safely stored in Supabase.

## Setup Instructions

### 1. Supabase Configuration

1.  **Create a Supabase Project**: Go to [database.new](https://database.new) and create a new project.
2.  **Create Table**: Run the following SQL in the SQL Editor:
    ```sql
    create table memories (
      id uuid default uuid_generate_v4() primary key,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      date date not null,
      description text not null,
      media_url text not null,
      type text check (type in ('image', 'video')) not null
    );
    ```
3.  **Create Storage Bucket**:
    - Go to **Storage** and create a new bucket named `memories`.
    - Make it **Public**.
4.  **Get Credentials**:
    - Go to **Project Settings** -> **API**.
    - Copy the `Project URL` and `anon public` key.

### 2. Environment Setup

1.  Rename `.env.local.example` to `.env.local` (or create it).
2.  Paste your credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

### 3. Run the App

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
