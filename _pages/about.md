---
permalink: /
title: "About me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I am an undergraduate student at Chung-Ang University, pursuing a Bachelor of Art and Technology and a Bachelor of Science in Cyber Security as a convergence major.

## Research Focus

My research lies in LLM safety and evaluation, with a focus on process-level diagnosis of instruction-following failures and refusal dynamics. Rather than treating safety as a final-answer-only problem, I study when, why, and how LLMs become safe or unsafe during generation.

## Current Work

My current work centers on Temporal Logit Observability for LLM safety failures. In [Beyond Attack Success Rate: Temporal Logit Observability for LLM Safety Failures](/publication/2026-01-22-beyond-attack-success-rate-temporal-logit-observability-llm-safety-failures), I examine generation-time signals such as logit trajectories, refusal and compliance margins, harmful-token tendencies, early-token behavior, and evaluation signals that reveal how safety failures form during decoding. This perspective treats attack success rate as an incomplete outcome metric and instead focuses on observing the formation process of safety failures.

## Selected Work

I also study instruction-following failures and refusal dynamics under adversarial or complex multi-turn contexts. My work on [Persona Attack: Incremental Memory Injection Jailbreak Attack against Large Language Models](/publication/2025-05-01-persona-attack-incremental-memory-injection-jailbreak) analyzes how attacker-controlled context can accumulate across turns and influence model behavior, while my work on [A GraphRAG-Based Framework for Interpreting Financial Security Regulations](/publication/2025-11-01-graphrag-financial-security-regulation-interpretation-framework) explores reliable retrieval and reasoning for domain-specific question answering.

## Future Directions

Looking ahead, I am interested in connecting generation-time safety signals to trustworthy evaluation, post-training, and agent safety. One direction is to study whether post-training methods such as SFT, RLHF, and DPO make models safe only at the final-output level, or also stabilize refusal dynamics throughout decoding. Another direction is to extend failure observability from final answers to agentic behavior, including tool-use decisions, action traces, memory updates, and planning steps where safety failures may emerge before a final response is produced.

## Technical Background

My technical background includes Python, PyTorch, Transformers, pandas, NumPy, FAISS, NetworkX, benchmark automation, jailbreak evaluation, LLM-as-Judge evaluation, LlamaGuard, HarmBench, Swift, Create ML, HealthKit, and Git.
