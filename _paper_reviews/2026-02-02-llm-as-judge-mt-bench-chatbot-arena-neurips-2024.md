---
title: "Judging LLM-as-judge with MT-Bench and Chatbot Arena, NeurIPS 2024"
date: 2026-02-02
permalink: /paper-reviews/llm-as-judge-mt-bench-chatbot-arena-neurips-2024/
excerpt: "인용 이유. LLM-as-judge 방식을 활용해 합성 데이터의 난이도 및 품질을 평가하고 데이터를 선별하는 기존의 인기있는 방법을 언급."
header:
  teaser: "notion-attachments/llm-as-judge-mt-bench-chatbot-arena-neurips-2024-figure-1-overview.png"
overview_image: "/images/notion-attachments/llm-as-judge-mt-bench-chatbot-arena-neurips-2024-figure-1-overview.png"
tags:
  - "federated-learning"
  - "paper-review"
  - "status-in-progress"
---
> 코멘트 및 요약
> 인용 이유. LLM-as-judge 방식을 활용해 합성 데이터의 난이도 및 품질을 평가하고 데이터를 선별하는 기존의 인기있는 방법을 언급.

[https://arxiv.org/pdf/2306.05685](https://arxiv.org/pdf/2306.05685)

# I. Introduction

---

> 논문 Introduction 요약

기존의 평가는 LLM의 핵심 능력을 제한된 작업 세트(e.g. 다지선다 형 지식 or 검색 질문)에서만 측정하고, multi-turn 대화에서 지시를 정확하게 따르는 능력과 같은 개방형 작업(open-ended task)에서 인간 선호도와 정렬을 적절히 평가하지 못함.

이를 MMLU 질문에 대한 fine-tuning된 모델과 기본 모델의 응답 차이로 설명함.

기본 모델은 기존 벤치마크(MMLU에서는 좋은 성능을 보이지만, open-ended 질문에는 별로인 대답을 함.

**⇒ 핵심 문제: 인간 선호도와 LLM 정렬을 평가하기 위한 강력하고 확장 가능한 자동화된 방법이 필요함. **

그래서 논문은 두 벤치마크를 만듦. 1)MT-Bench 2) Chatbot Arena

1. MT-Bench:
  - 챗봇의 multi-turn 대화 및 instruction-following ability 이 두개의 인간 선호도의 핵심요소를 평가하는 open-ended 질문.

  - 추론, 및 수학과같은 핵심 역량을 기반으로 챗봇을 평가할 수 있음

1. Chatbot Arena:
  - 실제 시나리오에서 chatbot간의 익명 대결을 하는 크라우드소싱 플랫폼

  - 사용자는 동시에 두 chatbot과 대화해 개인 선호도에따라 응답을 평가함

근데 이제 human evaluation이 gold standard(정답으로 가장 신뢰할 수 있는 참조 기준)이지만 너무 비쌈.

그래서 최첨단 LLM이 인간의 대리인이 되어 사용하는 것을 연구함.

이미 최첨단 LLM은 RLHF로 훈련되어서 이미 강력한 인간 정렬을 보여줌.

이런 접근 방식을 LLM-as-judge 라 부르기로 함. 이름이 너무 길어요,,

이 논문은 이 LLM-as-judge와 인간 평가의 골드스탠다드와 비교함.

position bias, verbosity bias, self-enhancement bias, limited reasoning bias 등 LLM-as-judge의 한계도 조사함. 일부는 완화 가능

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

MT-Bench and Chatbot Arena

2.1 동기

LLM이 발전하며 다양한 작업에서 artificial general intelligence를 보임

그래서 LLM 평가가 더 어려워짐 - 대충 얘가 할 수 있는게 늘어나니까 개쩌는 모델을 평가하는데 볼 게 많아지고 대부분 점수가 높고 정답의 정의가 애매한 항목들도 있음.

기존 벤치마크들은 멀티턴에서 사용자 지시를 정확히 따르고, zero-shot 방식으로 open-ended 질문에 답하는 능력를 평가하기에는 부적절함.

기존 벤치마크들은 아래 세가지로 나눌 수 있음:

- Core-knowledge benchmarks: MMLU, HellaSwag, GSM-8K, AGIEval 등 zero-shot, few-shot benchmark 셋임. LLM이 자동으로 검증될 수 있는 벤치마크 질문에 대해 짧고 구체적인 답변 생성을 요구

- Instruction-following benchmarks: Flan, Self-Instruction 등 더 개방적인 질문과 더 다양한 작업으로 확장. Instruction fine-tuning 후 LLM을 평가하는데 쓰임

- Conversational benchmark: CoQA, MMDialog, OpenAssistant 등이 있고, 이 논문의 의도와 가장 가깝지만 최신 모델들을 평가하기에는 다양성과 복잡성이 별로임.

⇒ 인간 선호도 평가 + 최신 모델의 능력 평가를 꽁으로 하는 벤치마크를 만들었다!

2.2 MT-Bench

80개의 고품질 멀티턴으로 구성 - 글쓰기, 역할극, 추출, 추론, 수학, 코딩 STEM(지식 I), 인문/사회과학(지식 II). 각 범주별로 10개의 멀티턴 질문들로 구성됨

멀티턴과 지시 이행 능력을 테스트하도록 설계됨

2.3 Chatbot Arena

사용자는 두개의 익명 모델과 동시에 상호작용해 두 모델의 동일한 질문에 대한 답변 중 선호하는 것을 고름.

한달동안 약 3만개의 투표 수집. 광범위한 실제 투표임.

LLM-as-judge

MT-Bench와 Chatbot Arena 의 대부분의 질문은 참조 답변 없는 open-ended이기에, 규칙 기반 출력 평가가 매우 어려움.

→ LLM이 chat assistant의 응답을 효과적으로 평가하고 인간의 선호도와 일치시킬 수 있을까?

3.1 LLM-as-judge 의 종류

독립적으로 이용 or 조합해서 구현 가능

- Pairwise comparison: LLM judge는 질문과 두개의 답변을 받고, 어느것이 더 나은지 결정 or 동점 선언 명령을 수행.
  - 근데 이제 얘는 player 수가 증가하면 확장성이 부족. 가능한 쌍의 수가 이차적으로 증가하기때문.

- Single answer grading: (대안) 단일답변에 직접 점수 부여
  - 얘는 특정 쌍 사이의 미묘한 차이를 구별하지 못함. judge가 바뀌면 점수 변동이 커짐.

- Reference-guided grading: 특정 경우(아마 수학일거임), 가능한 경우 참조 솔루션을 제공하는 것이 유익할 수 있음.

3.2 장점

확장성: 인간 개입이 줄어 빠르게 반복 가능

설명 가능성: 점수뿐아니라 설명도 제공해 출력 해석이 가능

3.3 한계

특정 편향과 한계. 그래도 인간과 일치도가 높음.

- Position bias:
  - LLM이 특정 위치를 다른 위치보다 선호하는 경향. 근데 인간도 똑같음.

  - 대부분의 LLM이 첫번째 위치를 선호함. GPT-4만이 일관된 결과 출력 - 답변 모델의 이름을 바꾸고, 위치를 바꾸는 실험을 진행해서 판단함.

  - 훈련 데이터의 탓? or 인과적 트랜스포머의 좌우 방향 아키텍쳐에 내재된 것? - 이유를 찾는 것은 future work

- Verbosity bias:
  - 짧은 대화보다 명확성, 품질 또는 정확성이 떨어져도 길고 장황한 응답을 선호

  - 불필요한(이미 있는 내용을 또 적어서) 장황함을 추가한 실험에서, GPT-4가 가장 안정적이다.

- Self-enhancement bias:
  - LLM judge가 자신들이 생성한 답변을 선호할 수 있는 효과

  - 이건 통계로 접근함. GPT-4는 10%의 승률로 자신을 선호, Claude는 25% 승률로 자신을 선호

  - 근데 얘네는 다른 모델들을 선호하기도 함. 근데 이제 GPT-3.5는 자신을 선호하지 않음…

  - 근데 이제 이건 실험하기 어려워서 안함. 다른 모델의 문체? 스타일을 흉내내는게 어려움.

  - 그리고 이건 생각보다 차이가 별로 없고, 데이터도 적어서 정확한 확인이 힘듦.

- Grading math and reasoning questions:
  - 본인에게 직접 들어온 질문은 풀고 정답을 맞출 수 있는데, 답변을 채점하는건 틀림.

  - GPT-4, GPT-3.5, Claude-v1도 마찬가지로 이런 문제를 보임.

3.4 문제 해결

- Swapping positions:

- Few-shot judge:

- Chain-of-Thought and reference-guided judge:

- Fine-tuning a judge model: 부록에 있음

3.5 Multi-turn judge

MT-Bench에서 각 질문은 평가를 위해 두 턴을 사용함. 그래서 두 어시스턴트를 비교할 때 두 개의 질문과 네 개의 답변을 제시해야함.

⇒ 1) 두 턴을 두 개의 prompt 로 나누기. vs 2) 전체 대화를 단일 prompt로
