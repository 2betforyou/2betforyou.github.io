---
title: "Synthetic Data from Diffusion Models Improves ImageNet Classification, Shekoofeh Azizi et al., TMLR 2023"
date: 2026-01-02
permalink: /paper-reviews/synthetic-data-diffusion-models-imagenet-classification-tmlr-2023/
excerpt: "최근 denoising diffusion probabilistic models(DDPMs)가 GAN과 품질면애서 비교할 수 있는 이미지를 생성하며 학습 중 더 큰 안정성을 제공함."
tags:
  - "federated-learning"
  - "paper-review"
  - "status-in-progress"
---
# I. Introduction

---

> 논문 Introduction 요약

최근 denoising diffusion probabilistic models(DDPMs)가 GAN과 품질면애서 비교할 수 있는 이미지를 생성하며 학습 중 더 큰 안정성을 제공함.

근데 이 기법이, generative data augmentation(생성적 데이터 증강) 등의 어려운 판별 작업에도 효과적인가?

구체적으로, Diffusion Model은 ImageNet 분류와 같이 잘 연구된 벤치마크 작업의 성능을 향상시킬 정도로 충분한 품질과 다양성을 갖춘 이미지 sample을 생성할 수 있을까?

⇒ fine-tuning을 통해 ImageNet에서 SOTA 급 class-conditional generative model을 만들 수 있다. (와!)

Synthetic Data

: large amounts of labeled data for vision tasks that require extensive annotation에 사용됨.

모델 기반 렌더링을 사용하는 방법과 달리, 이 논문은 자연 이미지의 데이터 기반 생성모델 사용에 중점을 두며, 이를 위해 GAN은 현재까지 지배적인 접근방식임.

여기서 모델 기반 렌더링은 물리모델, 기하모델, 조명모델 등을 명시적으로 설계해 이미지를 생성하는 방식 - 이 방식은 해석이 가능하며, 물리적으로 정합하지만 머리카락, 피부, 질감 등 복잡한 자연 이미지를 표현하기 어렵고 비용이 크게 든다.

data-driven generative models of natural images(자연 이미지의 데이터 기반 생성 모델)은 자연 이미지를 데이터로부터 학습해서 생성하는 모델.

이 방식은 이미지가 어떻게 생겨야 하는지를 명시적으로 정의하지 않고, 대량의 이미지를 보고 통계적 패턴을 학습하도록 하는 방식임.

Distillation and Transfer

: Diffusion Model에서 classifier로 knowledge transfer 하지만, label을 통해서 하는 것이 아니라, generated-data를 통해 지식을 전이함.

Diffusion Model Application

: large-scale text-to-image generator에 주목함.

+ downstream task 를 지원하기 위한 large-scale diffusion model은 아직 초기 단계임.

이 논문에서는 Imagen text-to-image model을 class-conditional ImageNet에 fine-tuning해 SOTA를 달성할 수 있다. 를 보여줌

Diffusion

: Diffusion model은 점진적으로 Gaussian Noise를 추가해 데이터를 파괴하고, 이 noise 제거 과정을 역으로 학습해 데이터를 복구하는 방식으로 작동함. Forward와 Reverse process 두 단계로 이루어짐.

- Forward process: time ⁍가 ⁍로 증가함에 따라 데이터에 무작위 노이즈가 추가됨.

- Trained Reverse process: forward process를 역전시커, noise sample을 점진적으로 이미지로 정제함.

현재 시간 단계의 sample ⁍은 학습된 Gaussian distribution ⁍에서 추출되며, 분포의 평균 ⁍는 이전 시간단계의 sample에 조건화되며 분포의 분산 ⁍는 fixed schedule을 따름

Classification Accuracy Score

: FID와 Inception Score가 국룰. 근데 이제 non-GAN model에 불리함. - 이 모델에 패널티를 부여하며, IS는 sampling modifications에 지나치게 낙관적인 점수를 부여함.

그래서 Ravuri 와 Vinyals는 생성된 데이터로 훈련된 ResNet-50 모델에 대한 ImageNet 검증 데이터 세트에서의 분류 성능을 추정하는 Classification Accuracy Score(CAS)를 제안함.

---

# II. Proposed Method

---

> 사용한 / 제시된 기법, 알고리즘 등 요약

Generative Model Training and Sampling

더 크고 일반적인 corpus에 pre-training하는 이점을 탐색하기 위해 large-scale text-to-image diffusion model을 기반으로 활용함.

+ 이미 완성된 조건부 생성기이기 때문. text-to-image diffusion model은 이미 걔쩌는 모델이다.. ImageNet-only class-conditional diffusion model을 처음부터 만들 이유가 없음.

→ “이미 존재하는 거대한 조건부 생성 구조”를 활용하는게 더 효율적인 판단.

핵심은 text-to-image model과 ImageNet class 사이의 alignment임. - text prompt가 ImageNet class가 요구하는 시각적 개념을 정확히 표현하는가? 더 쉽게, 이 텍스트로 생성된 이미지가 정말 그 ImageNet class에 해당하는가?

예를 들어, CLIP에서처럼 짧고 단순한 text 설명을 ImageNet의 각 class의 prompt에 아무 생각없이 그대로 쓰면 ImageNet 성능이 매우 나빠짐.

→ ImageNet class는 매우 정밀한데, prompt가 CLIP 에서처럼 단순해버리면 시각적으로 너무 간단한 이미지가 생성되며, class간 경계가 무너짐.

결과적으로 label noise 가 극심한 synthetic dataset이 됨.

⇒ 그래서 논문은 CLIP의 하나 또는 두 개의 단어로 된 class name 을 prompt 로 고정하고, diffusion 기반 generative model의 weight 와 sampling bias 를 fine-tuning함.

이전까지는 모델을 고정하고 prompt를 바꿔 text를 ImageNet에 맞춰서 성능이 별로였음.

근데 이 방법은 모델을 fine-tuning해서 prompt를 고정하고 model을 ImageNet에 맞추는 방식임.

Diffusion Model은 본질적으로 ⁍를 학습함. (⁍는 image, ⁍는 조건. 여기서 조건은 text prompt)

이때 fine-tuning을 하면, ‘이 text를 봤을 때 나와야하는 image 분포가 무엇인지'를 모델 파라미터가 직접 다시 학습하게 됨. 그래서 prompt가 단순해도 모델이 잘 작동하는 거임.

+ ImageNet의 class name을 모델이 언어적으로 이해하도록 하는 것이 아니라 이 token이 나오면, 이 class의 이미지를 생성하라고 매핑하듯 fine-tuning하는 것.

Imagen Fine-tuning

backbone text-to-image generator: ImageNet 훈련 데이터셋으로 fine-tuning할 모델로 large-scale Imagen text-to-image model을 선택함.

이 모델은 text를 contextual embeddings로 매핑해주는 pretrained text encoder와 이 embeddings를 점진적으로 증가하는 해상도의 이미지로 매핑하는 conditional diffusion model의 cascade를 포함함.

cascade는 2B의 parameter를 가진 64by64 text-to-image base model로 시작함.

이 모델의 출력을 64by64 에서 256by256으로 업샘플링하는 600M의 parameter를 가진 super-resolution model로 전달되고,

256by256에서 1024by1024로 업샘플링하는 400M의 parameter를 가진 model로 전달됨.

이 세 단계 모두 text cross-attention layer를 포함함.

최종 초해상도 모듈과 텍스트 인코더는 변경하지 않고, 64by64 base model과 64by64→256by256 super-resolution model만 ImageNet-1K train split에서 fine-tuning함.

⇒ 분류 성능(CAS)이 최종 목표지만, 모든 후보마다 CAS를 매번 돌리기에는 너무 비쌈. 그래서 FID로 모델 후보를 먼저 고룬 뒤 sampling parameters를 CAS관점으로 최적화 할 거임.

Sampling Parameters

diffusion samping의 품질, 다양성, 속도는 sampling 설정에도 좌우될 수 있음.

sampling 이유:

1) diffusion step 수(denoising step)

2) noise conditioning augmentation(cascade에서 다음 단계 입력에 노이즈 추가)

3) classifier-free guidance(CFG) weight

4) log-variance mixing coefficient(예측 분산/로그 분산을 섞는 계수; improved DDPM 류의 sampling technique)

base(64by64) - 이 모델의 sampling parameter가 sampling의 전반적인 품질/다양성을 결정함.

1) 1차 sweep - 빠르게 후보를 뽑음(FID 중심)

DDPM Sampler로 base에서 다음을 sweep:

- guidance weight

- log-variance

- denoising steps: 128/500/1000

⇒ 최적 FID는 log-variance=0, steps=1000에서 나온다고 함.

2) 2차 sweep - CAS까지 포함하는 sweep

1)에서 고른 설정을 고정한 뒤, gudiance weight를 여러값으로 바꾸며 1.2M 이미지를 실제로 새성해 validation set 기준으로 FID/IS/CAS를 측정

⇒ FID와 CAS관점에서 최적 gudiance weight는 약 1.25라고 봄.

guidance를 너무 키우면, text 조건 정합은 세지지만, 다양성은 죽고(또는 분포가 왜곡) 분류 학습에는 불리해질 수 있음.

논문은 그래서 Imagen 기본값보다 훨씬 작은 guidance를 선호함.

Super-Resolution(SR) step

base에서 최적을 잡은 뒤, SR 단계에서는 추가로 guidance weight, noise conditioning augmentation 값, log-variance mixing coefficient, stept(128/500/1000)를 sweep하며 FID vs CAS의 Pareto 곡선으로 균형점을 본다.

⇒ 전반적으로 FID와 CAS는 꽤 상관이 있고, 작은 guidance가 CAS에는 유리하지만, IS에는 불리할 수 있으며, noise augmentation = 0이 FID는 가장 작게 나오는 경향이 있으나, 이를 키우면 FID는 나빠져도 다양성이 증가한다고 함.

그래서 아래처럼 최종 sampling을 선택함

base에서 guidance = 1.25, SR에서 guidance = 10

DDPM Sampler 사용

log-variance mixing coefficient는 해상도별로 0.0/0.1 등 선택

보통 1000 denoising steps

1024 해상도에서는 Imagen처럼 DDIM 32 steps를 사용

sampling 시에는 noise conditioning augmentation 을 사용하지 않음

Generation Protocol - Dataset 제작 규칙

1) goal: ImageNet dataset의 train split과 닮게 만들기.

2) scale: 1.2M ~ 12M 까지 확장

---

# III. Results and Discussion

---

> 논문에 제시된 결과물 및 고찰을 요약

## i) Results

Fréchet Inception Distance, FID: 생성된 이미지 분포와 실제 이미지 분포 간의 거리를 측정하는 지표. 낮을수록 좋음

Inception Score, IS: 이미지의 선명도와 다양성을 측정하는 스코어. 높을수록 좋음

1. 개별 이미지가 명확한 클래스에 속함
