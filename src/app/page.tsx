"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, Legend, LineChart, Line, ComposedChart, ReferenceLine
} from "recharts";
import {
  Search, TrendingUp, Users, Star, MessageCircle, Clock, Download,
  RefreshCw, AlertCircle, Sparkles, Lightbulb, BarChart4, PieChart as PieIcon,
  Activity, CheckCircle2, XCircle, HelpCircle, Zap, Award, Target,
  Minus, ThumbsUp, ThumbsDown
} from "lucide-react";

const DATA_PATH = "/data";

// ── Color Palette ────────────────────────────────────────────────────────────
const C = {
  pos: "#22c55e",
  neg: "#ef4444",
  neu: "#6b7280",
  cyan: "#06b6d4",
  blue: "#3b82f6",
  purple: "#a855f7",
  yellow: "#eab308",
  bg: "#0d1117",
  card: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.07)",
};

const TOOLTIP_STYLE = {
  backgroundColor: "#161b22",
  border: "1px solid #30363d",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#ffffff",
};

const TOOLTIP_LABEL_STYLE = {
  color: "#ffffff",
  fontWeight: "bold",
  marginBottom: "4px",
};

const TOOLTIP_ITEM_STYLE = {
  color: "#ffffff",
  padding: "2px 0",
};

export default function Dashboard() {
  const [stats, setStats]         = useState<any>(null);
  const [timing, setTiming]       = useState<any>(null);
  const [features, setFeatures]   = useState<any>(null);
  const [sentiment, setSentiment] = useState<any>(null);
  const [trends, setTrends]       = useState<any[]>([]);
  const [intel, setIntel]         = useState<any>(null);
  const [feedback, setFeedback]   = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [tab, setTab]             = useState("overview");
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("All");

  const load = async () => {
    try {
      setLoading(true);
      console.log("Fetching static data from:", DATA_PATH);
      const [s, t, f, se, tr, i, fb] = await Promise.all([
        axios.get(`${DATA_PATH}/stats.json`).then(r => r.data),
        axios.get(`${DATA_PATH}/timing.json`).then(r => r.data),
        axios.get(`${DATA_PATH}/features.json`).then(r => r.data),
        axios.get(`${DATA_PATH}/sentiment.json`).then(r => r.data),
        axios.get(`${DATA_PATH}/trends.json`).then(r => r.data),
        axios.get(`${DATA_PATH}/intelligence.json`).then(r => r.data),
        axios.get(`${DATA_PATH}/feedback.json`).then(r => r.data),
      ]);
      const ensureArray = (val: any) => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string") {
          try { return JSON.parse(val); } catch (e) { return []; }
        }
        return [];
      };

      console.log("Data loaded successfully");
      setStats(typeof s === "string" ? JSON.parse(s) : s);
      setTiming(typeof t === "string" ? JSON.parse(t) : t);
      setFeatures(typeof f === "string" ? JSON.parse(f) : f);
      setSentiment(typeof se === "string" ? JSON.parse(se) : se);
      setTrends(ensureArray(tr));
      setIntel(typeof i === "string" ? JSON.parse(i) : i);
      setFeedback(ensureArray(fb));
    } catch (e) {
      console.error("Failed to load static data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const counts = useMemo(() => {
    const list = Array.isArray(feedback) ? feedback : [];
    return {
      All:      list.length,
      Positive: list.filter(x => x.Sentiment === "Positive").length,
      Neutral:  list.filter(x => x.Sentiment === "Neutral").length,
      Negative: list.filter(x => x.Sentiment === "Negative").length,
    };
  }, [feedback]);

  const filtered = useMemo(() => {
    const list = Array.isArray(feedback) ? feedback : [];
    return list.filter(x => {
      const matchQ = !search || Object.values(x).some(v => String(v).toLowerCase().includes(search.toLowerCase()));
      const matchF = filter === "All" || x.Sentiment === filter;
      return matchQ && matchF;
    });
  }, [feedback, search, filter]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#0d1117]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-lg">af</span>
        </div>
        <p className="text-gray-300 text-xs uppercase tracking-widest font-bold">aiforjob · Feedback Intelligence Platform</p>
      </div>
    </div>
  );

  const sentingBars = [
    { name: "Positive", count: stats.positive_count  || 0, pct: stats.positive_percentage  || 0, fill: C.pos },
    { name: "Neutral",  count: stats.neutral_count   || 0, pct: stats.neutral_percentage   || 0, fill: C.neu },
    { name: "Negative", count: stats.negative_count  || 0, pct: stats.negative_percentage  || 0, fill: C.neg },
  ];

  const choiceDist = Object.entries(stats.choice_distribution || {}).map(([k, v]) => ({
    name: k, count: v as number,
  }));

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <title>aiforjob Analytics | Sentiment Intelligence</title>
      <header className="sticky top-0 z-50 bg-[#0d1117]/90 backdrop-blur border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white font-black text-sm leading-none">af</span>
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white leading-none">aiforjob Analytics</h1>
            <p className="text-[10px] text-gray-300 tracking-widest">Sentiment Intelligence · Thapar Cohort</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] text-green-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Static Data Mode
          </span>
          <button onClick={load} className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-[11px] font-bold transition-all">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">

        {/* ── KPI ROW ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
          <KPI label="Responses"    value={stats.total_responses ?? 0}                          sub="Total cohort"         icon={<Users size={16}/>}        color="blue"   span="col-span-2" />
          <KPI label="NPS Score"    value={stats.net_promoter_estimate ?? 0}                   sub="Neural estimate"      icon={<Award size={16}/>}        color="purple" span="col-span-2" />
          <KPI label="Positive"     value={`${stats.positive_percentage ?? 0}%`}               sub={`${stats.positive_count ?? 0} responses`}  icon={<ThumbsUp size={16}/>}   color="green"  span="" />
          <KPI label="Negative"     value={`${stats.negative_percentage ?? 0}%`}               sub={`${stats.negative_count ?? 0} responses`}  icon={<ThumbsDown size={16}/>}  color="red"    span="" />
          <KPI label="Neutral"      value={`${stats.neutral_percentage ?? 0}%`}                sub={`${stats.neutral_count ?? 0} responses`}   icon={<Minus size={16}/>}      color="gray"   span="" />
          <KPI label="Avg Score"    value={stats.avg_sentiment ?? 0}                           sub={`±${stats.sentiment_std ?? 0} std`}        icon={<Activity size={16}/>}   color="cyan"   span="" />
          <KPI label="Relevance"    value={`${(stats.avg_relevance ?? 0).toFixed(2)}/5`}       sub="Avg rating"           icon={<Target size={16}/>}       color="yellow" span="" />
          <KPI label="Utility"      value={`${(stats.avg_utility ?? 0).toFixed(2)}/5`}         sub="Avg rating"           icon={<Zap size={16}/>}          color="yellow" span="" />
        </div>

        {/* ── TABS ─────────────────────────────────────── */}
        <nav className="flex gap-1 p-1 bg-white/3 border border-white/5 rounded-xl w-fit">
          {["overview","sentiment","features","feedback"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${tab===t ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-gray-300'}`}>
              {t}
            </button>
          ))}
        </nav>

        {/* ════════════════════ OVERVIEW ════════════════ */}
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Sentiment Area over Time */}
              <Card title="Sentiment Timeline" subtitle="Daily positive vs negative flow" icon={<Activity size={15}/>} cls="lg:col-span-2">
                <div className="h-[280px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={trends}>
                      <defs>
                        <linearGradient id="gPos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={C.pos} stopOpacity={0.25}/>
                          <stop offset="100%" stopColor={C.pos} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="gNeg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={C.neg} stopOpacity={0.25}/>
                          <stop offset="100%" stopColor={C.neg} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="#21262d" vertical={false}/>
                      <XAxis dataKey="Date" stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                      <YAxis stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                      <Legend iconType="circle" wrapperStyle={{fontSize:11}}/>
                      <Area type="monotone" dataKey="Positive" stroke={C.pos} strokeWidth={2} fill="url(#gPos)"/>
                      <Area type="monotone" dataKey="Neutral"  stroke={C.neu} strokeWidth={1.5} fill="none" strokeDasharray="4 2"/>
                      <Area type="monotone" dataKey="Negative" stroke={C.neg} strokeWidth={2} fill="url(#gNeg)"/>
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Donut */}
              <Card title="Sentiment Split" subtitle="Response polarity breakdown" icon={<PieIcon size={15}/>}>
                <div className="flex flex-col items-center mt-4">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={sentingBars} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                          dataKey="count" paddingAngle={4} stroke="none">
                          {sentingBars.map((e,i) => <Cell key={i} fill={e.fill}/>)}
                        </Pie>
                        <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} formatter={(v:any,n:any)=>[v, n]}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full space-y-3 mt-4 px-2">
                    {sentingBars.map(s => (
                      <div key={s.name}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="font-bold" style={{color:s.fill}}>{s.name}</span>
                          <span className="font-black text-white">{s.count} <span className="text-gray-300 font-normal">({s.pct}%)</span></span>
                        </div>
                        <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{width:`${s.pct}%`, backgroundColor:s.fill}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Daily Submissions */}
              <Card title="Daily Submissions" subtitle="Response intake volume" icon={<Clock size={15}/>}>
                <div className="h-[220px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timing.daily_volume} barSize={28}>
                      <XAxis dataKey="date" stroke="#485563" fontSize={9} tickLine={false} axisLine={false}/>
                      <YAxis stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                      <Bar dataKey="count" fill={C.blue} radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Hourly Heatmap-style */}
              <Card title="Submission Hour" subtitle="When students responded" icon={<Clock size={15}/>}>
                <div className="h-[220px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timing.hourly_volume} barSize={16}>
                      <XAxis dataKey="hour" stroke="#485563" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v)=>`${v}h`}/>
                      <YAxis stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                      <Bar dataKey="count" fill={C.purple} radius={[4,4,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Radar */}
              <Card title="Rating Radar" subtitle="Avg score across 4 dimensions" icon={<Target size={15}/>}>
                <div className="h-[220px] mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="72%" data={intel.radar}>
                      <PolarGrid stroke="#21262d"/>
                      <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={10} fontWeight={700}/>
                      <PolarRadiusAxis domain={[0,5]} stroke="#21262d" fontSize={9}/>
                      <Radar dataKey="A" stroke={C.cyan} fill={C.cyan} fillOpacity={0.3}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Choice Distribution */}
              <Card title="Usage Intent" subtitle="Would you use it regularly?" icon={<HelpCircle size={15}/>}>
                <div className="h-[220px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={choiceDist} layout="vertical" barSize={22} margin={{left:8,right:30}}>
                      <XAxis type="number" stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                      <YAxis dataKey="name" type="category" stroke="#485563" fontSize={11} tickLine={false} axisLine={false} width={70}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                      <Bar dataKey="count" radius={[0,6,6,0]}>
                        {choiceDist.map((e,i) => (
                          <Cell key={i} fill={e.name?.toLowerCase().includes('yes') ? C.pos : e.name?.toLowerCase().includes('no') ? C.neg : C.yellow}/>
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Avg Sentiment Over Time */}
              <Card title="Avg Sentiment Trend" subtitle="Daily mean score (DistilBERT)" icon={<TrendingUp size={15}/>} cls="lg:col-span-2">
                <div className="h-[220px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timing.daily_avg_sentiment}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#21262d" vertical={false}/>
                      <XAxis dataKey="date" stroke="#485563" fontSize={9} tickLine={false} axisLine={false}/>
                      <YAxis stroke="#485563" fontSize={10} tickLine={false} axisLine={false} domain={[-1,1]}/>
                      <ReferenceLine y={0} stroke="#374151" strokeDasharray="3 3"/>
                      <ReferenceLine y={0.3} stroke={`${C.pos}40`} strokeDasharray="3 3" label={{value:'Positive', fill:C.pos, fontSize:9}}/>
                      <ReferenceLine y={-0.2} stroke={`${C.neg}40`} strokeDasharray="3 3" label={{value:'Negative', fill:C.neg, fontSize:9}}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} formatter={(v:any)=>[Number(v).toFixed(3), 'Score']}/>
                      <Line type="monotone" dataKey="avg_score" stroke={C.cyan} strokeWidth={2.5} dot={{fill:C.cyan, r:4}} activeDot={{r:6}}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ════════════════════ SENTIMENT EDA ══════════ */}
        {tab === "sentiment" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Polarity Bar */}
              <Card title="Polarity Count" subtitle="Positive / Neutral / Negative" icon={<BarChart4 size={15}/>} cls="md:col-span-2">
                <div className="h-[260px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sentingBars} barSize={70}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#21262d" vertical={false}/>
                      <XAxis dataKey="name" stroke="#485563" fontSize={11} tickLine={false} axisLine={false}/>
                      <YAxis stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} formatter={(v:any,n,p) => [`${v} responses (${p.payload.pct}%)`, p.payload.name]}/>
                      <Bar dataKey="count" radius={[8,8,0,0]}>
                        {sentingBars.map((e,i)=> <Cell key={i} fill={e.fill}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Score Histogram */}
              <Card title="Score Distribution" subtitle="Histogram of sentiment scores" icon={<Activity size={15}/>}>
                <div className="h-[260px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sentiment?.histogram || []} barSize={18}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#21262d" vertical={false}/>
                      <XAxis dataKey="range" stroke="#485563" fontSize={8} tickLine={false} axisLine={false} angle={-30} textAnchor="end"/>
                      <YAxis stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                      <Bar dataKey="count" fill={C.purple} radius={[4,4,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Top Positive Verbatim */}
              <Card title="Top Positive Signals" subtitle="Highest scored feedback" icon={<ThumbsUp size={15}/>}>
                <div className="mt-4 space-y-3">
                  {(sentiment?.highlights?.positive || []).map((h:any, i:number) => (
                    <div key={i} className="p-3 rounded-xl bg-green-500/5 border border-green-500/15">
                      <p className="text-[11px] text-gray-200 italic leading-relaxed">"{String(h.text || h).slice(0,130)}"</p>
                      <span className="text-[9px] font-black text-green-500 mt-1 block">Score: {Number(h.SentimentScore ?? 0).toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Negative Verbatim */}
              <Card title="Critical Friction Points" subtitle="Lowest scored feedback" icon={<ThumbsDown size={15}/>}>
                <div className="mt-4 space-y-3">
                  {(sentiment?.highlights?.negative || []).map((h:any, i:number) => (
                    <div key={i} className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                      <p className="text-[11px] text-gray-200 italic leading-relaxed">"{String(h.text || h).slice(0,130)}"</p>
                      <span className="text-[9px] font-black text-red-500 mt-1 block">Score: {Number(h.SentimentScore ?? 0).toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Choice Score Avg */}
              <Card title="Intent → Score" subtitle="Avg sentiment by usage choice" icon={<Target size={15}/>}>
                <div className="h-[260px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={intel?.choice_score_avg || []} layout="vertical" barSize={28} margin={{left:10,right:40}}>
                      <XAxis type="number" stroke="#485563" fontSize={10} tickLine={false} axisLine={false} domain={[-1,1]}/>
                      <YAxis dataKey="choice" type="category" stroke="#485563" fontSize={10} tickLine={false} axisLine={false} width={70}/>
                      <ReferenceLine x={0} stroke="#374151"/>
                      <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} formatter={(v:any)=>[Number(v).toFixed(3), 'Avg Score']}/>
                      <Bar dataKey="avg" radius={[0,6,6,0]}>
                        {(intel?.choice_score_avg || []).map((e:any,i:number)=>(
                          <Cell key={i} fill={e.avg >= 0.3 ? C.pos : e.avg <= -0.2 ? C.neg : C.neu}/>
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Rating Averages */}
              <Card title="Category Ratings" subtitle="All 4 dimensions averaged" icon={<Star size={15}/>} cls="xl:col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {[
                    { label:"Relevance", value: stats.avg_relevance ?? 0, color: C.cyan },
                    { label:"Realism",   value: stats.avg_realism   ?? 0, color: C.blue },
                    { label:"Depth",     value: stats.avg_depth     ?? 0, color: C.purple },
                    { label:"Utility",   value: stats.avg_utility   ?? 0, color: C.yellow },
                  ].map(r => (
                    <div key={r.label} className="p-5 rounded-2xl bg-white/3 border border-white/5 text-center">
                      <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{r.label}</p>
                      <p className="text-4xl font-black mt-2" style={{color:r.color}}>{Number(r.value).toFixed(2)}</p>
                      <p className="text-[10px] text-gray-400 mt-1">/ 5.00</p>
                      <div className="h-1.5 mt-3 bg-gray-900 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${(Number(r.value)/5)*100}%`, backgroundColor:r.color}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ════════════════════ FEATURES ═══════════════ */}
        {tab === "features" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Adopted Features" subtitle="Most used by students" icon={<BarChart4 size={15}/>}>
              <div className="h-[420px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={features?.popular || []} layout="vertical" barSize={22} margin={{left:8,right:50}}>
                    <XAxis type="number" stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                    <YAxis dataKey="item" type="category" stroke="#485563" fontSize={10} tickLine={false} axisLine={false} width={160}/>
                    <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                    <Bar dataKey="count" fill={C.cyan} radius={[0,8,8,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Requested Features" subtitle="What students want next" icon={<Lightbulb size={15}/>}>
              <div className="h-[420px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={features?.requested || []} layout="vertical" barSize={22} margin={{left:8,right:50}}>
                    <XAxis type="number" stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                    <YAxis dataKey="item" type="category" stroke="#485563" fontSize={10} tickLine={false} axisLine={false} width={160}/>
                    <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                    <Bar dataKey="count" fill={C.yellow} radius={[0,8,8,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Most Useful Features" subtitle="Rated highest for utility value" icon={<Star size={15}/>} cls="lg:col-span-2">
              <div className="h-[300px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={features?.most_useful || []} barSize={40} margin={{left:8,right:30}}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#21262d" vertical={false}/>
                    <XAxis dataKey="item" stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#485563" fontSize={10} tickLine={false} axisLine={false}/>
                    <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={TOOLTIP_ITEM_STYLE} labelStyle={TOOLTIP_LABEL_STYLE}/>
                    <Bar dataKey="count" fill={C.purple} radius={[6,6,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Priority Issues" subtitle="Extracted from negative sentiment cluster" icon={<AlertCircle size={15}/>}>
              <div className="mt-4 space-y-3">
                {(intel?.top_issues || []).map((item:any, i:number) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/10">
                    <span className="text-[11px] font-bold text-gray-200 uppercase">{item.issue}</span>
                    <span className="text-lg font-black text-red-400">{item.count}×</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Top Recommendations" subtitle="Aggregated student suggestions" icon={<Sparkles size={15}/>}>
              <div className="mt-4 space-y-3">
                {(intel?.top_recommendations || []).map((item:any, i:number) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                    <span className="text-[11px] font-bold text-gray-200 uppercase">{item.recommendation}</span>
                    <span className="text-lg font-black text-yellow-400">{item.count}×</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ════════════════════ FEEDBACK ═══════════════ */}
        {tab === "feedback" && (
          <div className="space-y-5">
            {/* Search + Filter Row */}
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              <div className="relative flex-grow">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, roll, or text…"
                  className="w-full pl-11 pr-4 py-3 bg-white/3 border border-white/7 rounded-xl text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <div className="flex p-1 bg-white/3 border border-white/7 rounded-xl gap-1 flex-shrink-0">
                {(["All","Positive","Neutral","Negative"] as const).map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight flex items-center gap-1.5 transition-all ${filter===cat ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-gray-300'}`}>
                    {cat}
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${filter===cat ? 'bg-white/20' : 'bg-white/5'}`}>
                      {counts[cat as keyof typeof counts]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 px-4 py-2 bg-white/2 border border-white/5 rounded-xl text-[10px] text-gray-300 font-bold">
              <span>Showing <span className="text-white">{filtered.length}</span> of <span className="text-white">{feedback.length}</span> responses</span>
              <span className="text-green-500">● {counts.Positive} Positive</span>
              <span className="text-gray-300">● {counts.Neutral} Neutral</span>
              <span className="text-red-500">● {counts.Negative} Negative</span>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((item, idx) => <FeedCard key={idx} item={item} feedback={feedback}/>)}
            </div>

            {filtered.length === 0 && (
              <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-gray-400 text-xs uppercase tracking-widest">No results match your filter</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function KPI({ label, value, sub, icon, color, span}: any) {
  const colors:any = {
    blue: "text-blue-400 bg-blue-500/10",
    green: "text-green-400 bg-green-500/10",
    red: "text-red-400 bg-red-500/10",
    cyan: "text-cyan-400 bg-cyan-500/10",
    purple: "text-purple-400 bg-purple-500/10",
    yellow: "text-yellow-400 bg-yellow-500/10",
    gray: "text-gray-200 bg-gray-500/10",
  };
  return (
    <div className={`${span} p-4 rounded-2xl bg-white/3 border border-white/7 flex items-center gap-3`}>
      <div className={`p-2 rounded-xl ${colors[color]}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-wider leading-none truncate">{label}</p>
        <p className="text-xl font-black text-white mt-0.5 leading-none">{value}</p>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-none">{sub}</p>
      </div>
    </div>
  );
}

function Card({ title, subtitle, icon, children, cls="" }: any) {
  return (
    <div className={`${cls} p-5 rounded-2xl bg-white/3 border border-white/7 hover:border-white/10 transition-all`}>
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-gray-800/80 border border-white/5 text-gray-200">{icon}</div>
        <div>
          <h3 className="text-sm font-black leading-none">{title}</h3>
          {subtitle && <p className="text-[10px] text-gray-300 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function FeedCard({ item, feedback }: any) {
  const TEXT  = Object.keys(item).find(k => k.includes("Why did you choose")) || "";
  const ROLL  = "Roll No.";
  const NAME  = Object.keys(item).find(k => k === "Full Name") || "";
  const CHOICE= Object.keys(item).find(k => k.includes("would you use")) || "";

  const text    = item[TEXT]   || "No comment provided.";
  const roll    = item[ROLL]   || "N/A";
  const name    = item[NAME]   || "Participant";
  const choice  = item[CHOICE] || "";
  const sent    = item.Sentiment;
  const score   = Number(item.SentimentScore || 0).toFixed(3);
  const date    = item.Date || "";

  const isPos = sent === "Positive";
  const isNeg = sent === "Negative";

  const borderColor = isPos ? "#22c55e30" : isNeg ? "#ef444430" : "#6b728030";
  const topColor    = isPos ? C.pos : isNeg ? C.neg : C.neu;
  const badgeBg     = isPos ? "bg-green-500/10 text-green-400" : isNeg ? "bg-red-500/10 text-red-400" : "bg-gray-500/10 text-gray-200";

  return (
    <div className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 duration-200"
      style={{ borderColor, backgroundColor: "rgba(255,255,255,0.02)", borderTopWidth: 3, borderTopColor: topColor }}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border border-white/10 bg-gray-800/80 flex-shrink-0">
            {name[0]?.toUpperCase()}
          </div>
          <div className="flex-grow min-w-0">
            <p className="font-black text-white text-sm leading-none truncate">{name}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-[9px] font-bold">#{roll}</span>
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${badgeBg}`}>{sent}</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-300 text-[9px] font-bold">{score}</span>
              {choice && (
                <span className="flex items-center gap-1 text-[9px] font-bold text-gray-300">
                  {choice.toLowerCase().includes('yes') ? <CheckCircle2 size={9} className="text-green-500"/> : choice.toLowerCase().includes('no') ? <XCircle size={9} className="text-red-500"/> : <HelpCircle size={9} className="text-yellow-500"/>}
                  {choice.split(' ')[0]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="text-[12px] leading-relaxed text-gray-200 italic">"{text}"</p>

        {/* Score bar */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex justify-between text-[9px] text-gray-400 mb-1 font-bold">
            <span>-1.0 Negative</span>
            <span>+1.0 Positive</span>
          </div>
          <div className="h-1.5 bg-gray-900 rounded-full relative overflow-visible">
            <div className="absolute top-1/2 left-1/2 -translate-x-0.5 -translate-y-1/2 w-0.5 h-3 bg-gray-700 rounded"/>
            <div className="h-full rounded-full" style={{
              width: `${((Number(item.SentimentScore || 0) + 1) / 2) * 100}%`,
              backgroundColor: topColor
            }}/>
          </div>
          {date && <p className="text-[9px] text-gray-500 mt-1.5 text-right">{date}</p>}
        </div>
      </div>
    </div>
  );
}
