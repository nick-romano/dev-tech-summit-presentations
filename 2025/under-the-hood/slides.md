---
titleTemplate: '%s'
author: Jesse van den Kieboom, Nick Romano
mdc: true
colorSchema: dark
---

## ArcGIS Maps SDK for JavaScript: <br/> Under the Hood
- Part 1: Code Metamorphosis: How Our SDK Transforms <br/> Through Multiple Compilation Stages
- Part 2: Continuous Integration and TypeScript Enhancements: <br/> Transitioning from Jenkins to GitHub Actions, Scaling, and <br/>Strict Null Checks

Nick Romano, Jesse van den Kieboom

---
is: feedback
---

---
layout: intro
---

# Code <br/> Metamorphosis:
### How Our SDK Transforms <br/> Through Multiple Compilation Stages

---

# Background


- Brief overview of the Maps SDK's evolution to include declarative UX components
- The challenge: Distributing these components to varied teams with different tech stacks

---

<div class="container mx-auto px-12">
<div class="grid grid-cols-2 gap-4">
  <div class="bg-gray-500/50 p-4 rounded-lg">
    <h2 class="text-2xl font-bold">Before</h2>
    <p class="text-lg">A single monolithic library</p>
    <img src="../images/before.png" class="object-fit rounded-lg overflow-hidden"></img>
  </div>
  <div>
  <div class="bg-gray-500/50 p-4 rounded-lg">
    <h2 class="text-2xl font-bold">After</h2>
    <p class="text-lg">A collection of packages</p>
    <img src="../images/after.png" class="object-fit rounded-lg overflow-hidden"></img>
  </div>
  </div>
</div>
</div>

---

# The Challenge

- Enforce consistency across multiple teams
- Provide documentation and types for developers
- Distribute components to teams with different tech stacks
- Ensure components are optimized for performance and usability

---

# Compilers to the rescue

- We use many different compilers to:
  - transform our source code into multiple outputs
  - Generate documentation, types, and other metadata
  - Analyze our code while we write it


---

# Transformations

<div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
  <h2 class="text-2xl font-bold mb-4">Our source code is transformed into multiple outputs:</h2>
  <ul class="list-disc list-inside space-y-2">
    <li class="flex items-center">
      <svg class="w-6 h-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"/></svg>
      Documentation metadata that powers developer site
    </li>
    <li class="flex items-center">
      <svg class="w-6 h-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"/></svg>
      Types for multiple libraries and frameworks (React, Preact, Stencil, Vanilla JS)
    </li>
    <li class="flex items-center">
      <svg class="w-6 h-6 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"/></svg>
      Wrapper components for React 18
    </li>
    <li class="flex items-center">
      <svg class="w-6 h-6 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"/></svg>
      CDN optimized bundles that allow for lazy loading of components, hybrid imports
    </li>
    <li class="flex items-center">
      <svg class="w-6 h-6 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"/></svg>
      ESM bundle
    </li>
  </ul>
</div>

---

# Our Web Component Compilation Pipeline

<div class="font-mono grid grid-cols-3 gap-4">
  <div class="bg-gray-500/50 px-3 rounded py-2 w-full" v-click>
    <h4>Parse</h4>
    <p class="mt-4 text-md">Parse the source code into an abstract syntax tree</p>
  </div>
  <div class="bg-gray-500/50 px-3 py-2 rounded w-full" v-click>
    <h4>Transform</h4>
    <p class="mt-4 text-md">Apply various transformations to the AST, such as:</p>
    <ul class="list-disc list-inside mt-4 text-sm">
      <li>Optimizing code for performance</li>
      <li>Removing unused code</li>
      <li>Adding metadata for documentation</li>
      <li>Minifying code to reduce file size</li>
      <li>Adding polyfills for older browsers</li>
    </ul>
  </div>
  <div class="bg-gray-500/50 rounded px-3 py-2 w-full" v-click>
    <h4>Re-Assemble</h4>
    <p class="mt-4 text-md">Re-assemble the code as javascript, or even create a completely different output</p>
  </div>
</div>

---

# Same code, multiple targets

- Vanilla JS output
- React 18 wrappers
- CDN optimized bundles

---


# Final notes


---
src: ../.meta/footer.md
---

---