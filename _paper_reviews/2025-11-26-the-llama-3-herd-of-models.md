---
title: "The Llama 3 Herd of Models"
date: 2025-11-26
permalink: /paper-reviews/the-llama-3-herd-of-models/
excerpt: "Llama 3(.1) 모델의 Technical Report"
tags:
  - "jailbreak-attacks"
  - "paper-review"
  - "status-done"
---
# I. Introduction

---

> Llama 3(.1) 모델의 Technical Report

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

이 문서에는 Llama-3.2 모델은 포함되지 않음. 3.2모델은 [https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/) 여기 내용을 참고함.

llama 3.2 1B, 3B 모델에는 pruning와 distillation 두 가지 방법을 사용하여, 기기에 효율적으로 설치할 수 있는 최초의 고성능 경량 Llama 모델을 구현함.

1. 데이터 필터링 및 선별

- 개인 정보 보호: 훈련 데이터에 포함될 수 있는 개인 식별 정보를 탐지하고 제거. 이름,주소, 연락처 등 개인 정보가 노출될 위험을 줄여줌

- 유해 콘텐츠 차단: 폭력적이거나 혐오스러운 콘텐츠, 차별적인 발언, 성적인 콘텐츠 등 유해한 정보를 포함하는 웹사이트나 도메인을 사전에 차단.

- 품질 기반 선별: 모델 기반의 품질 분류기를 사용해 텍스트의 품질을 평가하고, Wikipedia 등 신뢰할 수 있는 소스에 참조될 가능성이 높은 고품질 텍스트 선별.

이들은 모델의 안전성 확보, 개인정보보호, 고품질데이터 확보와 직결됨.

2. 보상 모델(RM, Reward Model) 훈련

- 선호도 데이터 수집: 인간 annotator가 모델의 응답에 대한 선호도를 평가하고, 더 나은 응답과 그렇지 않은 응답을 구분한다. 이 데이터는 “선호하는 응답 > 선호하지 않는 응답” 형태로 구성됨.

- 보상 모델 훈련: 사전 훈련된 모델을 기반으로, 선호하는 응답에 더 높은 점수를 부여하도록 훈련. 모델은 주어진 입력에 대해 다양한 응답을 생성하고, 보상 모델은 각 응답의 품질을 평가.

3. SFT

- Instruction 데이터 준비: 인간이 작성하거나 모델이 생성한 Instruction 데이터 준비. 이 데이터는 모델이 특정 task를 수행하는 방법을 학습하는 데 사용됨.

- 모델 Finetuning: 사전 훈련된 모델을 준비된 instruction 데이터를 사용하여 추가적으로 훈련. 이 과정을 통해 모델이 instruction을 더 잘 이해하고 따르도록 함.

4. DPO, Direct Preference Optimization

- 선호도 데이터 활용: 보상 모델을 사용하여 생성된 선호도 데이터를 활용.

- 모델 직접 최적화: 보상 모데를 직접 사용하지 앟고, 선호하는 응답과 그렇지 않은 응답 간의 차이를 통해 모델을 조정함. 모델은 선호하는 응답의 확률을 높이고, 선호하지 않는 응답의 확률을 낮추도록 훈련됨.

5. 추가적인 안저 Mitigation 전략

- Formatting token masking: DPO loss function에서 헤더 및 종료 token과 같은 특수 포맷팅 토큰을 마스킹해 DPO 훈련을 안정화함. 이는 모델이 원치않는 반복이나 갑작스러운 종료 token 생성을 방지하는데 도움이 됨.

- NLL Loss를 사용한 정규화: 선택된 시퀀스에 대해 추가적인 Negative Log-Likelihood(NLL) loss 항을 추가해 DPO 훈련을 더욱 안정화하고, 생성에 대한 바람직한 포맷팅을 유지하며, 선택된 응답의 로그 확률 감소를 방지.

---

5.4.2 Safety Pre-training

개인식별정보를 포함할 가능성이 높은 웹사이트를 식별하는 필터와 같은 다양한 필터를 적용함.

We also focus heavily on discoverable memorization

- 모델이 학습 데이터를 기억하는 현상(memorization)을 평가하고 관리하는 방법을 설명한다.

- 이거는 모델의 학습 데이터 유출을 방지하기 위해 Carlini et al (Quantifying Memorization Across Neural Language Models, 2022)에서 제시한 방법과 유사한 방법으로 모델이 얼마나 유출하지 않는지 평가한다. 뭐 이런 내용임

5.4.3 Safety Finetuning

(1) 안전 훈련 데이터 (2) 위험 완화 기술 두 가지가 포함되는 부분

Violation Rate(VR), False Refusal Rate(FRR)를 최적화함. 이와 병행해 안전성 개선이 전반적인 유용성을 저해하지 않도록 유용성 벤치마크에서 모델 성능을 평가함.

Finetuning Data는 양보다 질이 더 중요함. 보통은 사람이 생성한 데이터를 사용하지만, 미묘한(애매한) 안전 정책의 경우 오류와 불일치가 발생하기 쉬운 등 완전히 핏 하지 않음.

그래서 엄격한 품질 보증 프로세스를 지원하는 AI-assisted annotation 도구를 개발함.

적대적 프롬프트 뿐 아니라 이와 유사한 “경계선 프롬프트(Borderline Prompt)”도 수집함. 이는 적대적 프롬프트와 관련이 있지만, 모델이 유용한 응답을 제공하는 방법을 배우도록 가르쳐서 FRR을 줄여줌.

…

Safety Supervised Finetuning

Llama 2 recipe에 따라 모델 align 단게에서 모든 유용성 데이터와 안전 데이터를 결합함. 또한 안전한 요청과 안전하지 않은 요청 간의 미묘한 차이를 모델이 식별하는 데 도움이 되도록 “borderline dataset(경계선 데이터세트)”를 도입함.

SFT는 적대적 예제와 경계선 예제의 비율을 전략적으로 균형을 맞출 때 모델을 정렬하는 데 매우 효과적이라는 것을 발견함. 더 높은 비율의 경계선 예제와 함께 더 어려운 위험 영역에 초점을 맞춤. 이는 FR을 최소로 유지하며 안전 완화 노력을 성공시키는 역할을 함.

Safety DPO

안전 학습을 강화하기 위해 적대적 예제와 경계선 예제를 DPO의 선호도 데이터세트에 통합함.

Safety Results

targeted mitigation 없이는 many-shot jailbreaking 공격에 취약함.

이러한 문제를 해결하기 위해, context에서 안전하지 않은 행동의 데모가 있는 경우 안전한 행동의 예시를 포함하는 SFT 데이터 세트에서 모델을 fine tuning함. VR을 상당ㄹ히 줄이는 확장 가능한 완화 전략을 개발해 256-shot 공갹에서도 더 긴 context 공격의 영향을 효과적으로 무력화 한다. 이 접근 방식은 FRR 및 대부분의 유용성 지표에 거의 영향을 미치지 않는다.

추가로Many-shot Jailbreak를 평가지표로 삼음. 그래서 공격이 잘 안되는건가 싶기도 하고…….

1. Pre-Training

pruning을 통해 기존 모델의 크기를 줄이는 동시에 최대한 많은 지식과 성능을 회복할 수 있었다. Llama-3.1-8B 모델의 single-shot 방식으로 pruning을 적욜함. 이는 네트워크의 일부를 체계적으로 제거하고 가중치와 그래디언트의 크기를 조정해 기존 네트워크의 성능을 유지하며 더 작고 효율적인 모델을 만드는 것을 포함함.

Knowledge Distillation은 더 큰 네트워크를 사용해 더 작은 네트워크에 지식을 전달하는데, 이는 더 작은 모델이 처음부터 학습하는 것 보다 더 나은 성능을 보일 수 있다는 가설에 기반함. Llama-3.1-8B, 70B 모델의 logit을 모델 개발의 pre-training에 통합했으며, 더 큰 모델의 logit을 token level 목표로 사용함. 성능 회복을 위해 pruning 후 Knowledge Distillation을 수행함.

2. Post-Training

사전 학습된 모델 위에 여러 round의 alignment를 수행해 최종 chatting model을 생성함. 각 round에는 SFT(Supervised Fine-Tuning), RS(Rejection Sampling) and DPO(Direct Preference Optimization)가 포함됨.

- Reward Modeling: Training Objective는 Llama 2와 동일하지만, data scaling 후 개선 효과가 미미해 loss에서 margin term을 제거함.? Llama2에 따라 유사한 response가 있는 sampling을 filtering을 한 후 reward modeling을 위해 모든 preference data를 사용함. 표준 preference pair(chosen, rejected) response 외에도 annotations는 일부 prompt에 대해 세 번째 “edited response”를 생성함. 여기서 해당 pair의 chosen response는 추가 개선을 위해 편집됨. 따라서 각 preference ranking sample에는 명확한 ranking(edited > chosen > rejected)을 가진 두개 또는 세개의 response가 있음. Prompt와 여러 response를 별도의 row에 넣고 score를 계산하는 표준 시나리오에 대한 approximation이지만, ablation에서 이 접근 방식은 정확도의 loss 없이 training 효율성을 향상시킨다. 그러면 reward model은 human annotation prompt에 대한 rejection sampling을 수행하는 데 사용된다.
  - SFT: Supervised Fine-Tuning, 지도 미세조정. RM에서 만든 rejection-sampled data와 다른 data source(synthetic data 포함)와 함께 target token에 대한 표준 cross entropy loss를 사용해 사전 훈련된 LM을 finetune함(prompt token에 대한 loss masking).

  - DPO: Direct Preference Optimization. Human preference alignment를 위해 DPO를 사용해 SFT model을 추가로 training한다. training을 위해 이전 alignment round에서 가장 뛰어난 성능을 보이는 model을 사용해 수집된 다장 최근의 preference data batch를 주로 사용함. 결과적으로 training data는 각 round에서 최적화되는 policy model의 distribution에 더 잘 부합함. DPO에는 다음과 같은 algorithmic modifications를 적용함.
    - DPO loss에서 formatting token masking: DPO Training을 안정화하기 위해 loss에서 chosen 및 rejected response 모두에서 header 및 termination token을 포함한 특수 formatting token을 masking함. 이러면 tail repetition 또는 termination token을 갑자기 생성하는 것과 같은 원치 않는 모델 행동을 억제할 수 있음. 이는 DPO lossd의 대조적인 특성 때문이라고 가정함.?

Post-Training단계에서 context window를 128K token 까지 확장. 고품질을 보장하기 위해 신중한 데이터 처리 및 필터링을 거치는 합성 데이터 생성에도 참여…

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
