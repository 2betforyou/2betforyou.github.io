---
title: "Llava Guard: An Open VLM-based Framework for Safeguarding Vision Datasets and Models"
date: 2025-11-08
permalink: /paper-reviews/llava-guard-open-vlm-safeguarding-vision-datasets-models/
excerpt: "VLM(Vision-Language Model): Text 및 Image 생성. Visual and Textual Inputs."
tags:
  - "jailbreak-attacks"
  - "paper-review"
  - "status-done"
---
# I. Introduction

---

VLM(Vision-Language Model): Text 및 Image 생성. Visual and Textual Inputs.

Training

- 광범위한 web-scraped data.

- 이를 모니터링 하는 것은 불가능에 가까움 ← 편향된 contents를 포함할 수 있기에 모니터링 함.

→ 따라서 LlavaGuard를 통해 이미지 라벨링을 사전에 진행(Safe/Unsafe)

why?

i) 모델 학습 중 안전을 저해할 수 있는 콘텐츠를 제외해 안전한 학습 환경을 구축.

ii) LlavaGuard로 생성된 데이터셋은 향후 연구에 유용한 리소스가 될 것.

---

# II. Proposed Method

---

LlavaGuard: VLM Safeguard. Visual Content의 안전 규정 준수여부를 평가하는 다목적 도구

- 정책에 대한 안전 주수를 위해 이미지를 판단하고, “안전 등급, 범주 및 근거”를 제공

Visual and Textual Inputs ← 분류기가 이미지를 실시간으로 분석 및 평가 해야함.

Input: Image, Safety Policy

↓

LlavaGuard

↓

Output:

1. Safety Rating

1. Safety Category

1. Safety Rationale

⇒  Overall safety rating(safe/unsafe)

A specific safety category

Rationale that explains ‘why’ the content is deemed unsafe according to the given policy

⇒ Flexibility handle a broad spectrum of policies

Dataset: 3242 safe / 2224 unsafe ←→ 4571 train / 71 eval / 824 test(카테고리, rating에 대해 균형을 이룸-골고루)

Outputs

1. Safety Rating: Safe / Unsafe를 나타냄.

1. Category: 이미지를 가장 잘 설명하는 카테고리를 할당

1. Rationale: 1, 2와 관련해서 이미지에 대한 자연어 설명

→ 할 수 있는 일

1. 데이터 감사: 
대규모 데이터셋 내에서 유해콘텐츠를 자동으로 식별해 분류. 
안전하지 않은 콘텐츠가 모델 학습에 사용되는 것을 방지하는데 기여.

1. 생성모델 검열: 
Text-to-Image 모델이 생성하는 이미지의 안전성을 실시간으로 평가해, 유해한 이미지가 제공되는 것을 가드(Guard)함.

---

# III. Results and Discussion

---

> 논문에 제시된 결과물 및 고찰을 요약

## i) Results

## ii) Discussion

---

# IV. Summary

---

> 최종 요약 정리

---

© Written by 2betforyou
