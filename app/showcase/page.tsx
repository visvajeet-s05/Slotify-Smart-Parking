"use client"

import { motion } from "framer-motion"
import { 
  Shield, Lock, Scale, BookOpen, GraduationCap, 
  Activity, AlertTriangle, CheckCircle2, ArrowRight,
  Globe, Smartphone, Zap, Star, MapPin, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ColorShowcasePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-white font-bold text-xl">Color System</div>
          <div className="flex items-center gap-6">
            <a href="#slate" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">Slate</a>
            <a href="#cyan" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">Cyan</a>
            <a href="#indigo" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">Indigo</a>
            <a href="#emerald" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">Emerald</a>
            <a href="#amber" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">Amber</a>
            <a href="#teal" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium">Teal</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Professional <span className="text-gradient-hero">Color System</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              A comprehensive color palette designed for modern digital experiences. 
              Each color serves a specific purpose in creating intuitive, accessible, and beautiful interfaces.
            </p>
            <Button className="h-14 px-8 bg-cyan-500 text-white hover:bg-cyan-400 rounded-xl font-semibold shadow-lg shadow-cyan-500/30">
              Explore Colors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Slate Color System */}
      <section id="slate" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Slate Color System</h2>
            <p className="text-slate-400 text-lg">Backgrounds, borders, and typography hierarchy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Slate 950 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-950 rounded-xl mb-4 border border-slate-800" />
              <h3 className="text-slate-200 font-semibold mb-2">slate-950</h3>
              <p className="text-slate-500 text-sm">Main page dark backgrounds and dark selection text</p>
            </div>

            {/* Slate 900 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-900 rounded-xl mb-4 border border-slate-800" />
              <h3 className="text-slate-200 font-semibold mb-2">slate-900</h3>
              <p className="text-slate-500 text-sm">Card background fills, button surfaces, and container panels</p>
            </div>

            {/* Slate 800 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-800 rounded-xl mb-4 border border-slate-700" />
              <h3 className="text-slate-200 font-semibold mb-2">slate-800</h3>
              <p className="text-slate-500 text-sm">Card borders, dividers, subtle outlines, and secondary hover states</p>
            </div>

            {/* Slate 700 */}
            <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all">
              <div className="h-24 bg-slate-700 rounded-xl mb-4" />
              <h3 className="text-slate-200 font-semibold mb-2">slate-700</h3>
              <p className="text-slate-500 text-sm">Button borders and standard UI outlines</p>
            </div>

            {/* Slate 500 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-500/10 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-slate-500 text-sm">Footer Text</span>
              </div>
              <h3 className="text-slate-200 font-semibold mb-2">slate-500</h3>
              <p className="text-slate-500 text-sm">Footer text and low-contrast metadata captions</p>
            </div>

            {/* Slate 400 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-400/10 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-slate-400 text-sm">Body Copy</span>
              </div>
              <h3 className="text-slate-200 font-semibold mb-2">slate-400</h3>
              <p className="text-slate-500 text-sm">Body copy, secondary navigation links, and subtext</p>
            </div>

            {/* Slate 300 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-300/10 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-slate-300 text-sm font-medium">Button Label</span>
              </div>
              <h3 className="text-slate-200 font-semibold mb-2">slate-300</h3>
              <p className="text-slate-500 text-sm">Button labels, key section headings, and emphasis text</p>
            </div>

            {/* Slate 200 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-200/10 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-slate-200 text-sm font-semibold">High Contrast</span>
              </div>
              <h3 className="text-slate-200 font-semibold mb-2">slate-200</h3>
              <p className="text-slate-500 text-sm">High-contrast button labels and primary card text</p>
            </div>

            {/* Slate 100 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="h-24 bg-slate-100/10 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-slate-100 text-sm font-bold">Primary Heading</span>
              </div>
              <h3 className="text-slate-200 font-semibold mb-2">slate-100</h3>
              <p className="text-slate-500 text-sm">Primary white-range page headings and body text</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cyan - Primary Brand Accent */}
      <section id="cyan" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Cyan - Primary Brand Accent</h2>
            <p className="text-slate-400 text-lg">Health/Medical theme and primary actions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cyan 500 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
              <div className="h-16 bg-cyan-500 rounded-xl mb-6 flex items-center justify-center">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">cyan-500</h3>
              <p className="text-slate-400 text-sm mb-6">Primary action buttons, selection highlights, and badge backgrounds</p>
              <Button className="w-full bg-cyan-500 text-white hover:bg-cyan-400 rounded-xl font-medium">
                Primary Action
              </Button>
            </div>

            {/* Cyan 400 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400/50 transition-all">
              <div className="h-16 bg-cyan-400/20 rounded-xl mb-6 flex items-center justify-center border border-cyan-400/30">
                <Activity className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">cyan-400</h3>
              <p className="text-slate-400 text-sm mb-6">Brand logos, key icons, primary highlights, section text, and hover states</p>
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <Activity className="h-5 w-5" />
                <span>Brand Logo</span>
              </div>
            </div>

            {/* Cyan 300 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-cyan-300/50 transition-all">
              <div className="h-16 bg-cyan-300/10 rounded-xl mb-6 flex items-center justify-center">
                <a href="#" className="text-cyan-300 font-medium hover:underline">Interactive Link</a>
              </div>
              <h3 className="text-white font-semibold mb-2">cyan-300</h3>
              <p className="text-slate-400 text-sm mb-6">Interactive link hover states and ICD-10 code text</p>
              <a href="#" className="text-cyan-300 hover:text-cyan-400 transition-colors font-medium">
                Hover Link State →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Indigo - EdTech Theme */}
      <section id="indigo" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Indigo - EdTech Theme</h2>
            <p className="text-slate-400 text-lg">Interactive studio and educational platforms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Indigo 500 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="h-16 bg-indigo-500 rounded-xl mb-6 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">indigo-500</h3>
              <p className="text-slate-400 text-sm">EdTech card icon container fills</p>
            </div>

            {/* Indigo 400 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-400/50 transition-all">
              <div className="h-16 bg-indigo-400/20 rounded-xl mb-6 flex items-center justify-center border border-indigo-400/30">
                <GraduationCap className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">indigo-400</h3>
              <p className="text-slate-400 text-sm">EdTech icons, action links, and hero gradient highlights</p>
            </div>

            {/* Indigo 300 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-300/50 transition-all">
              <div className="h-16 bg-indigo-300/10 rounded-xl mb-6 flex items-center justify-center">
                <a href="#" className="text-indigo-300 font-medium hover:text-indigo-400">Card Link</a>
              </div>
              <h3 className="text-white font-semibold mb-2">indigo-300</h3>
              <p className="text-slate-400 text-sm">EdTech card link hover states</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emerald - Web3 Escrow & Security */}
      <section id="emerald" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Emerald - Security & Low-Risk</h2>
            <p className="text-slate-400 text-lg">Web3 Escrow, security indicators, and low-risk badges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Emerald 500 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-all">
              <div className="h-16 bg-emerald-500 rounded-xl mb-6 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">emerald-500</h3>
              <p className="text-slate-400 text-sm">Web3 Escrow icon container fills</p>
            </div>

            {/* Emerald 400 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-emerald-400/50 transition-all">
              <div className="h-16 bg-emerald-400/20 rounded-xl mb-6 flex items-center justify-center border border-emerald-400/30">
                <Lock className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">emerald-400</h3>
              <p className="text-slate-400 text-sm">Security indicators, lock icons, and Web3 Escrow links</p>
            </div>

            {/* Emerald 300 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-emerald-300/50 transition-all">
              <div className="h-16 bg-emerald-300/10 rounded-xl mb-6 flex items-center justify-center">
                <a href="#" className="text-emerald-300 font-medium hover:text-emerald-400">Escrow Link</a>
              </div>
              <h3 className="text-white font-semibold mb-2">emerald-300</h3>
              <p className="text-slate-400 text-sm">Web3 Escrow hover states</p>
            </div>
          </div>

          {/* Low-Risk Badge Example */}
          <div className="mt-12 bg-slate-950 border border-slate-800 rounded-2xl p-8">
            <h4 className="text-white font-semibold mb-6">Risk Badge Examples</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-medium">Low Risk</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Moderate Risk</span>
              </div>
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-red-400 text-sm font-medium">Severe Risk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amber - Legal Desk */}
      <section id="amber" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Amber - Legal Desk</h2>
            <p className="text-slate-400 text-lg">Legal actions and moderate-risk badges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Amber 500 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-amber-500/50 transition-all">
              <div className="h-16 bg-amber-500 rounded-xl mb-6 flex items-center justify-center">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">amber-500</h3>
              <p className="text-slate-400 text-sm">Legal Desk icon container fills</p>
            </div>

            {/* Amber 400 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-amber-400/50 transition-all">
              <div className="h-16 bg-amber-400/20 rounded-xl mb-6 flex items-center justify-center border border-amber-400/30">
                <Scale className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">amber-400</h3>
              <p className="text-slate-400 text-sm">Legal Desk icons and legal action links</p>
            </div>

            {/* Amber 300 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-amber-300/50 transition-all">
              <div className="h-16 bg-amber-300/10 rounded-xl mb-6 flex items-center justify-center">
                <a href="#" className="text-amber-300 font-medium hover:text-amber-400">Legal Link</a>
              </div>
              <h3 className="text-white font-semibold mb-2">amber-300</h3>
              <p className="text-slate-400 text-sm">Legal Desk hover states</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teal - Gradient Accents */}
      <section id="teal" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Teal - Gradient Accents</h2>
            <p className="text-slate-400 text-lg">Medical research links and hero headline gradients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Teal 400 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-teal-400/50 transition-all">
              <div className="h-16 bg-teal-400/20 rounded-xl mb-6 flex items-center justify-center border border-teal-400/30">
                <BookOpen className="h-8 w-8 text-teal-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">teal-400</h3>
              <p className="text-slate-400 text-sm mb-6">PubMed research citations and hero headline text gradients</p>
              <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">
                PubMed Research Citation →
              </a>
            </div>

            {/* Teal 300 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-teal-300/50 transition-all">
              <div className="h-16 bg-gradient-to-r from-teal-400 to-teal-300 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-white font-bold">Gradient</span>
              </div>
              <h3 className="text-white font-semibold mb-2">teal-300</h3>
              <p className="text-slate-400 text-sm">Hero headline gradient transitions</p>
            </div>
          </div>

          {/* Hero Gradient Example */}
          <div className="mt-12 bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center">
            <h4 className="text-gradient-hero text-5xl font-black mb-4">
              Hero Headline Gradient
            </h4>
            <p className="text-slate-400 text-lg">
              Using teal-400 to teal-300 gradient for impactful headlines
            </p>
          </div>
        </div>
      </section>

      {/* Base Colors */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Base Color Standards</h2>
            <p className="text-slate-400 text-lg">White for titles, red for urgent alerts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* White */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="h-16 bg-white rounded-xl mb-6 flex items-center justify-center">
                <Globe className="h-8 w-8 text-slate-900" />
              </div>
              <h3 className="text-white font-bold text-2xl mb-2">White</h3>
              <p className="text-slate-400 text-sm">Pure white brand titles and major page headers</p>
            </div>

            {/* Red */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="h-16 bg-red-500 rounded-xl mb-6 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-2xl mb-2">Red</h3>
              <p className="text-slate-400 text-sm">Severe/urgent diagnostic risk badges (dynamic risk logic)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Complete UI Example */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Complete UI Example</h2>
            <p className="text-slate-400 text-lg">All colors working together in a professional interface</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
              <div>
                <h3 className="text-white font-bold text-2xl">Dashboard Overview</h3>
                <p className="text-slate-400 text-sm mt-1">Real-time system status</p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Operational</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="h-5 w-5 text-cyan-400" />
                  <span className="text-slate-500 text-xs">ACTIVE</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">12,847</div>
                <div className="text-slate-400 text-sm">Total Users</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">SECURE</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-slate-400 text-sm">Uptime</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="h-5 w-5 text-indigo-400" />
                  <span className="text-indigo-400 text-xs">LEARNING</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">8,234</div>
                <div className="text-slate-400 text-sm">Courses</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Scale className="h-5 w-5 text-amber-400" />
                  <span className="text-amber-400 text-xs">LEGAL</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">156</div>
                <div className="text-slate-400 text-sm">Compliance</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4">Recent Activity</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">New booking confirmed</div>
                      <div className="text-slate-500 text-sm">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-medium">Success</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Moderate risk detected</div>
                      <div className="text-slate-500 text-sm">15 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1">
                    <AlertTriangle className="h-3 w-3 text-amber-400" />
                    <span className="text-amber-400 text-xs font-medium">Warning</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Critical system alert</div>
                      <div className="text-slate-500 text-sm">1 hour ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1">
                    <AlertTriangle className="h-3 w-3 text-red-400" />
                    <span className="text-red-400 text-xs font-medium">Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © 2024 Professional Color System. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Documentation</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">GitHub</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
