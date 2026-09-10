# Ke Xu — Academic Homepage

This repository is a data-driven Jekyll site for GitHub Pages. Profile information, publications, news, and teaching content live in `_data`; shared markup lives in `_includes` and `_layouts`.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000`.

## Add a publication

Append an item to `_data/publications.yml`. Keep records in reverse chronological order. The required fields are `id`, `year`, `selected`, `title`, `authors`, `venue`, and at least one item in `links`.

```yaml
- id: short-stable-id
  year: 2026
  selected: false
  title: "Paper title"
  image: /Imgs/paper-figure.png # optional
  authors:
    - { name: "Ke Xu", self: true }
    - { name: "Coauthor", equal: true }
    - { name: "Corresponding Author", corresponding: true }
  venue: { name: "Full Venue Name", abbr: "VENUE" }
  links:
    paper: https://example.com/paper
    code: https://github.com/example/repository
```

Supported link keys are `paper`, `pdf`, `code`, `project`, `journal`, and `supplement`. A missing image or optional link is omitted automatically. Set `selected: true` to place an item in Selected Publications; all other records are grouped by year under Other Publications.

## Add news

Append an item to `_data/news.yml`, newest first:

```yaml
- date: 2026-09-10
  featured: true
  title:
    en: "A concise English headline."
    zh: "简洁的中文标题。"
  detail:
    en: "One sentence of detail."
    zh: "一行补充说明。"
  links:
    paper: https://example.com/paper
    code: https://github.com/example/repository
```

The homepage shows the first five entries initially. `featured: true` applies the burgundy emphasis used for major or recent updates.

## Add a course

Add a record under `courses` in `_data/teaching.yml`:

```yaml
courses:
  - term: "Fall 2026"
    title:
      en: "Course name"
      zh: "课程名称"
    audience:
      en: "Undergraduate"
      zh: "本科生"
    url: https://example.com/course # optional
```

## Update shared content

- `_data/profile.yml`: biography, affiliation, contact details, and research topics.
- `_data/ui.yml`: shared English and Chinese interface copy.
- `_data/navigation.yml`: primary navigation labels and routes.

Run `bundle exec jekyll build` before publishing. GitHub Pages rebuilds the site automatically after changes are pushed to the configured publishing branch.
