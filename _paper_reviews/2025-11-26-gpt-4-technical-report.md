---
title: "GPT-4 Technical Report"
date: 2025-11-26
permalink: /paper-reviews/gpt-4-technical-report/
excerpt: "이전 GPT 모델과 마찬가지로, 인간 피드백을 통한 강화 학습(RLHF, Reinforcement Learning from Human Feedback)을 사용해 produce response better aligned with user’s intent."
tags:
  - "jailbreak-attacks"
  - "paper-review"
  - "status-done"
---
# I. Introduction

---

> GPT-4의 Technical Report

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

이전 GPT 모델과 마찬가지로, 인간 피드백을 통한 강화 학습(RLHF, Reinforcement Learning from Human Feedback)을 사용해 produce response better aligned with user’s intent.

하지만 RLHF는 완벽하지 않음. 안전한 입력과 안전하지 않은 입력 모두에서 원치 않은 응답을 받을 수 있다. (exhibit undesired behaviors)

따라서 추가적인 안전 관련 RLHF 훈련 프롬포트와 규칙 기반 보상 모델(RBRM, Rule-Based Reward Model)이라는 두 가지 주요 구성 요소로 이루어져 있다.

여기서 RBRM은 zero-shot GPT-4 분류기 세트임.

These classifiers provide an additional reward signal to the GPT-4 policy model during RLHF fine-tuning that targets correct behavior, such as refusing to generate harmful content or not refusing innocuous requests.

이러한 분류기들은 RLHF fine-tunig 과정에서 GPT-4 Policy Model(Model이 어떤 State에서 어떤 Action을 할 지를 결정하는 함수 또는 신경망)에게 **추가적인 보상 신호**를 제공한다. 이 보상은 **유해한 콘텐츠 생성을 거부**하거나, **무해한 요청을 부당하게 거부하지 않는** 등 올바른 행동을 유도하는 것을 목표로 한다.

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
