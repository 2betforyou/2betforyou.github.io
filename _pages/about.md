---
permalink: /
layout: default
title: "AI Safety Research"
description: "Junyoung Park studies how LLM safety failures form during generation through process-level evaluation and temporal logit observability."
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

{% include base_path %}
{% assign recent_reviews = site.paper_reviews | sort: "date" | reverse %}

<main id="main" class="home-main" role="main">
  <section class="home-hero" aria-labelledby="home-title">
    <div class="home-hero__field" aria-hidden="true">
      <span class="home-hero__axis home-hero__axis--one"></span>
      <span class="home-hero__axis home-hero__axis--two"></span>
      <span class="home-hero__point"></span>
    </div>

    <div class="site-shell home-hero__inner">
      <div class="home-hero__main">
        <p class="section-kicker"><span>AI Safety Research</span><span>Seoul · KR</span></p>
        <h1 id="home-title" class="home-hero__title"><span>Junyoung</span><span>Park</span></h1>
        <p class="home-hero__lede">I study how language models become safe or unsafe during generation—token by token, before the final answer hides the process.</p>
        <div class="home-hero__actions">
          <a class="text-link text-link--strong" href="#selected-work">Explore selected work <span aria-hidden="true">↓</span></a>
          <a class="text-link" href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>
        </div>
      </div>

      <aside class="home-hero__aside" aria-label="Current research focus">
        <p class="home-hero__aside-label">Current signal</p>
        <p class="home-hero__aside-title">Temporal Logit Observability</p>
        <p>Generation-time traces for understanding refusal dynamics, compliance shifts, and the formation of safety failures.</p>
        <dl class="home-hero__facts">
          <div><dt>Focus</dt><dd>LLM Safety</dd></div>
          <div><dt>Method</dt><dd>Process-level Evaluation</dd></div>
          <div><dt>Context</dt><dd>Chung-Ang University</dd></div>
        </dl>
      </aside>
    </div>

    <a class="home-hero__scroll" href="#selected-work" aria-label="Scroll to selected work"><span>Selected work</span><i aria-hidden="true"></i></a>
  </section>

  <section id="selected-work" class="home-section home-section--work" aria-labelledby="selected-work-title">
    <div class="site-shell">
      <header class="section-heading">
        <p class="section-heading__index">01</p>
        <div>
          <p class="section-heading__eyebrow">Research portfolio</p>
          <h2 id="selected-work-title">Selected work</h2>
        </div>
        <a class="text-link" href="{{ base_path }}/portfolio/">Open full portfolio <span aria-hidden="true">↗</span></a>
      </header>

      <div class="project-grid">
        <article class="project-card project-card--1">
          <a class="project-card__link" href="{{ base_path }}/publication/2026-01-22-beyond-attack-success-rate-temporal-logit-observability-llm-safety-failures" aria-label="Read TLO research">
            <div class="project-card__visual" aria-hidden="true">
              <figure class="project-figure project-figure--tlo">
                <figcaption class="project-figure__caption"><span>Temporal diagnostic trace</span><strong>Same ASR · different failure paths</strong></figcaption>
                <div class="tlo-plot">
                  <span class="tlo-plot__curve tlo-plot__curve--refusal"></span>
                  <span class="tlo-plot__curve tlo-plot__curve--compliance"></span>
                  <span class="tlo-plot__crossing"><b>t<sub>cross</sub></b></span>
                  <span class="tlo-plot__label tlo-plot__label--refusal">Refusal</span>
                  <span class="tlo-plot__label tlo-plot__label--compliance">Compliance</span>
                  <span class="tlo-plot__time"><b>Early</b><i></i><b>Late</b></span>
                </div>
                <p class="project-figure__note">Logit-only · Calibrated · Temporal</p>
              </figure>
              <span class="project-card__number">01</span>
            </div>
            <div class="project-card__body">
              <p class="project-card__meta"><span>Safety evaluation · First author</span><span>2026</span></p>
              <h3>TLO: Observing failure before the final answer</h3>
              <p>A logit-only diagnostic that follows refusal and compliance margins at every decoding step, revealing when and how safety weakens even when final ASR looks similar.</p>
              <span class="project-card__cta">View research <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </article>

        <article class="project-card project-card--2">
          <a class="project-card__link" href="{{ base_path }}/publication/2025-05-01-persona-attack-incremental-memory-injection-jailbreak" aria-label="Read Persona Attack research">
            <div class="project-card__visual" aria-hidden="true">
              <figure class="project-figure project-figure--persona">
                <figcaption class="project-figure__caption"><span>Incremental memory injection</span><strong>Context compounds across turns</strong></figcaption>
                <ol class="persona-sequence">
                  <li><b>01</b><span>Instruction</span></li>
                  <li><b>02</b><span>Framing</span></li>
                  <li><b>03</b><span>Memory</span></li>
                  <li><b>04</b><span>Request</span></li>
                </ol>
                <div class="persona-result">
                  <div><strong>95.0%</strong><span>ASR · GPT-4o sequential</span></div>
                  <div class="persona-bars">
                    <p><span>Once</span><i><b class="persona-bars__once"></b></i><em>75</em></p>
                    <p><span>Sequential</span><i><b class="persona-bars__sequential"></b></i><em>95</em></p>
                  </div>
                </div>
              </figure>
              <span class="project-card__number">02</span>
            </div>
            <div class="project-card__body">
              <p class="project-card__meta"><span>Jailbreak evaluation · First author</span><span>2026</span></p>
              <h3>Persona Attack: Multi-turn memory injection</h3>
              <p>An evaluation of how incremental memory and repeated context framing can make long-running conversations prioritize attacker-imposed context over safety policy.</p>
              <span class="project-card__cta">View research <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </article>

        <article class="project-card project-card--3">
          <a class="project-card__link" href="{{ base_path }}/publication/2025-11-01-graphrag-financial-security-regulation-interpretation-framework" aria-label="Read GraphRAG research">
            <div class="project-card__visual" aria-hidden="true">
              <figure class="project-figure project-figure--graphrag">
                <figcaption class="project-figure__caption"><span>Relation-aware retrieval</span><strong>Evidence paths, not isolated chunks</strong></figcaption>
                <ol class="figure-pipeline">
                  <li>Query</li>
                  <li>FAISS</li>
                  <li>Graph expand</li>
                  <li>Evidence</li>
                </ol>
                <div class="recall-bars">
                  <p><span>Plain RAG</span><i><b class="recall-bars__plain"></b></i><em>59.6%</em></p>
                  <p><span>GraphRAG</span><i><b class="recall-bars__graph"></b></i><em>79.8%</em></p>
                </div>
                <p class="project-figure__note"><strong>+20.2%p</strong> Recall@5 · 3,711 nodes · 100% edge precision</p>
              </figure>
              <span class="project-card__number">03</span>
            </div>
            <div class="project-card__body">
              <p class="project-card__meta"><span>Financial AI · Oral accepted</span><span>2025</span></p>
              <h3>GraphRAG for traceable financial QA</h3>
              <p>A graph-grounded retrieval system that connects regulation clauses and relation paths to each answer, improving Recall@5 from 59.6% to 79.8%.</p>
              <span class="project-card__cta">View research <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </article>

        <article class="project-card project-card--4">
          <a class="project-card__link" href="{{ '/CV_Portfolio/Portfolio_JunyoungPark.pdf' | relative_url }}#page=9" aria-label="View FinSec LLM post-training in the portfolio PDF">
            <div class="project-card__visual" aria-hidden="true">
              <figure class="project-figure project-figure--finsec">
                <figcaption class="project-figure__caption"><span>Evaluation-aware post-training</span><strong>Teach the model to write grounded answers</strong></figcaption>
                <ol class="figure-pipeline figure-pipeline--finsec">
                  <li>Domain data</li>
                  <li>RAG context</li>
                  <li>QLoRA SFT</li>
                  <li>Evaluate</li>
                </ol>
                <dl class="finsec-metrics">
                  <div><dt>Train</dt><dd>1,452</dd></div>
                  <div><dt>Chunks</dt><dd>2,075</dd></div>
                  <div><dt>Sources</dt><dd>30</dd></div>
                  <div><dt>Method</dt><dd>4-bit</dd></div>
                </dl>
              </figure>
              <span class="project-card__number">04</span>
            </div>
            <div class="project-card__body">
              <p class="project-card__meta"><span>Post-training · Independent project</span><span>2026</span></p>
              <h3>FinSec LLM post-training for grounded QA</h3>
              <p>A domain pipeline combining QLoRA SFT, hybrid retrieval, and answer evaluation to improve correctness, groundedness, formatting, and uncertainty handling.</p>
              <span class="project-card__cta">View in portfolio <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </article>
      </div>
    </div>
  </section>

  <section class="home-section home-section--lens" aria-labelledby="research-lens-title">
    <div class="site-shell">
      <header class="section-heading">
        <p class="section-heading__index">02</p>
        <div>
          <p class="section-heading__eyebrow">Approach</p>
          <h2 id="research-lens-title">Research lens</h2>
        </div>
      </header>

      <div class="research-lens">
        <p class="research-lens__statement">Safety is not only a property of the final answer. It is a process that can be observed, measured, and improved while generation unfolds.</p>
        <ol class="research-lens__steps">
          <li>
            <span>01 / Observe</span>
            <h3>Trace the formation process.</h3>
            <p>Study logit trajectories, early-token behavior, refusal margins, and action traces before they collapse into one outcome metric.</p>
          </li>
          <li>
            <span>02 / Evaluate</span>
            <h3>Measure more than success rate.</h3>
            <p>Design evaluations that explain when, why, and how instruction-following and safety failures emerge.</p>
          </li>
          <li>
            <span>03 / Build</span>
            <h3>Connect evidence to systems.</h3>
            <p>Apply trustworthy evaluation to post-training, retrieval systems, and agentic decisions where failures may appear early.</p>
          </li>
        </ol>
      </div>
    </div>
  </section>

  <section class="home-section home-section--reviews" aria-labelledby="recent-reviews-title">
    <div class="site-shell">
      <header class="section-heading">
        <p class="section-heading__index">03</p>
        <div>
          <p class="section-heading__eyebrow">Working notes</p>
          <h2 id="recent-reviews-title">Recent paper reviews</h2>
        </div>
        <a class="text-link" href="{{ base_path }}/paper-reviews/">Reading archive <span aria-hidden="true">↗</span></a>
      </header>

      <div class="review-list">
        {% for review in recent_reviews limit: 5 %}
          <a class="review-row" href="{{ base_path }}{{ review.url }}">
            <time datetime="{{ review.date | date_to_xmlschema }}">{{ review.date | date: "%Y.%m.%d" }}</time>
            <span class="review-row__title">{{ review.title }}</span>
            <span class="review-row__tag">{% if review.tags and review.tags.size > 0 %}{{ review.tags | first }}{% else %}Paper review{% endif %}</span>
            <span class="review-row__arrow" aria-hidden="true">↗</span>
          </a>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="home-section home-section--profile" aria-labelledby="profile-title">
    <div class="site-shell profile-panel">
      <div class="profile-panel__heading">
        <p class="section-heading__index">04</p>
        <p class="section-heading__eyebrow">Profile</p>
        <h2 id="profile-title">Researching systems<br>from the inside out.</h2>
      </div>
      <div class="profile-panel__body">
        <p>I am an undergraduate student at Chung-Ang University, pursuing a Bachelor of Art and Technology and a Bachelor of Science in Cyber Security as a convergence major.</p>
        <p>My work connects LLM safety, trustworthy evaluation, benchmark automation, GraphRAG, and applied machine learning. I am especially interested in extending failure observability from final answers to tool use, memory, planning, and other agentic behavior.</p>
        <div class="profile-panel__actions">
          <a class="button-link" href="{{ base_path }}/cv/">View CV <span aria-hidden="true">↗</span></a>
          <a class="button-link button-link--quiet" href="{{ base_path }}/portfolio/">Open portfolio</a>
        </div>
      </div>
    </div>
  </section>
</main>
