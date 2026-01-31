"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiFetch, cn } from '@/lib/utils';
import { 
  MapPin, 
  Wifi, 
  ChevronRight, 
  Copy, 
  ExternalLink, 
  X,
  Share2,
  Image as ImageIcon
} from 'lucide-react';

// --- 类型定义 ---
interface StoreInfo {
  name: string;
  intro: string;
  address: string;
  logo: string;
  banner: string[];
  wifi_name: string;
  wifi_pwd: string;
  meituan_id: string;
  comment_id: string;
  gddp_id: string;
  douyin_id: string;
  follow_douyin: string;
  qun_img: string;
  images: string[];
}

interface GroupPurchase {
  title: string;
  url: string;
}

// --- 弹窗组件 ---
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- 主页面内容 ---
function StoreContent() {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('store_id');
  
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [groupPurchases, setGroupPurchases] = useState<GroupPurchase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'platform' | 'wechat' | 'wifi'>('platform');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [activePlatformType, setActivePlatformType] = useState<string>('');
  const [copywritingOptions, setCopywritingOptions] = useState<string[]>([]);
  const [selectedCopyIdx, setSelectedCopyIdx] = useState<number>(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [selectedWechatImageIdx, setSelectedWechatImageIdx] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWechatGuide, setShowWechatGuide] = useState(false);

  useEffect(() => {
    // 微信环境检测
    const isWechat = /MicroMessenger/i.test(navigator.userAgent);
    if (isWechat) {
      setShowWechatGuide(true);
    }
    // 只有当storeId存在时才获取数据
    if (storeId) {
      fetchStoreData();
    }
  }, [storeId]);

  const fetchStoreData = async () => {
    try {
      const info = await apiFetch(`/store/shopInfo?store_id=${storeId}`);
      setStore(info.data);
      
      const gp = await apiFetch(`/store/GrouPurchase?store_id=${storeId}`);
      // 确保获取到的是数组，如果后端返回了嵌套结构，尝试读取 data
      const gpArray = Array.isArray(gp.data) ? gp.data : (gp.data?.data || []);
      setGroupPurchases(Array.isArray(gpArray) ? gpArray : []);
    } catch (err) {
      console.error('获取店铺信息失败', err);
    }
  };

  const [activePlatformId, setActivePlatformId] = useState<string>('');

  const handleActionClick = async (type: string, title: string, platformId: string) => {
    if (!platformId || platformId === '#' || platformId.trim() === '') {
      alert('商家暂未配置该平台打卡链接');
      return;
    }
    setModalTitle(title);
    setModalType('platform');
    setActivePlatformType(type);
    setActivePlatformId(platformId);
    setIsModalOpen(true);
    setIsGenerating(true);
    setCopywritingOptions([]);
    setSelectedCopyIdx(0);
    setSelectedImageIdx(0);
    
    try {
      const res = await apiFetch('/store/generateCopywriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_id: parseInt(storeId!), type })
      });
      if (res.data && Array.isArray(res.data.contents)) {
        setCopywritingOptions(res.data.contents);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setCopywritingOptions([
        '这家店的环境和服务真的很不错，推荐大家来体验！',
        '味道超赞，食材也很新鲜，性价比很高，下次还会带朋友一起来。',
        '装修很有格调，拍照非常出片，是周末聚会的好去处。',
        '服务员态度特别好，非常有耐心，这种体验必须给五星好评！'
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // 处理关注抖音按钮点击
  const handleFollowDouyinClick = () => {
    if (!store?.follow_douyin || store.follow_douyin === '#' || store.follow_douyin.trim() === '') {
      alert('商家暂未配置抖音关注链接');
      return;
    }
    window.open(store.follow_douyin, '_blank');
  };

  const getPlatformUrl = (type: string, id: string) => {
    if (!id || id === '#') return '#';
    
    // 清理首尾空格
    const cleanId = id.trim();
    
    // 如果商家输入的是完整的 http/https 链接，直接返回
    if (cleanId.startsWith('http')) return cleanId;
    
    // 如果输入的是 www 开头但没写 http，补全它
    if (cleanId.startsWith('www.')) return `https://${cleanId}`;
    
    // 如果是 ID，则拼接对应的协议头（用于拉起 App）
    switch(type) {
      case 'meituan': return `imeituan://www.meituan.com/deal/detail?id=${cleanId}`;
      case 'comment': return `dianping://shopinfo?id=${cleanId}`;
      case 'gaode': return `amapuri://navigation/move?id=${cleanId}`;
      case 'douyin': return `snssdk1128://user/profile/${cleanId}`;
      default: return cleanId;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('文案已复制');
  };

  const handleGroupPurchaseClick = (e: React.MouseEvent, url: string | undefined) => {
    if (!url || url === '#' || url.trim() === '') {
      e.preventDefault();
      alert('商家暂未配置该团购链接');
    }
  };

  // 如果没有指定store_id，显示店铺选择界面
  if (!storeId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">欢迎使用门店智慧助手</h1>
            <p className="text-gray-600 mb-6">请输入店铺ID开始体验</p>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="请输入店铺ID (如: 84)" 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.currentTarget.value.trim();
                  if (input) {
                    window.location.href = `/?store_id=${input}`;
                  }
                }
              }}
            />
            <button 
              onClick={() => {
                const input = document.querySelector('input') as HTMLInputElement;
                if (input && input.value.trim()) {
                  window.location.href = `/?store_id=${input.value.trim()}`;
                }
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
            >
              进入店铺
            </button>
          </div>
          <div className="text-xs text-gray-400 pt-4 border-t border-gray-100">
            <p>示例店铺ID: 84, 85, 86...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!store) return <div className="min-h-screen flex items-center justify-center">加载中...</div>;

  const checkInPlatforms = [
    { id: 'meituan', title: '美团打卡', icon: 'https://p0.meituan.net/travelcube/45c79a92755511adc4c5c4a9658b01cc2855.png', platformId: store.meituan_id },
    { id: 'comment', title: '点评打卡', icon: 'https://p0.meituan.net/travelcube/1afafcf021389814a60123512390886c3230.png', platformId: store.comment_id },
    { id: 'gaode', title: '高德打卡', icon: 'https://p0.meituan.net/travelcube/35532296e95511adc4c5c4a9658b01cc1435.png', platformId: store.gddp_id },
    { id: 'douyin', title: '抖音点评', icon: 'https://p0.meituan.net/travelcube/35532296e95511adc4c5c4a9658b01cc1435.png', platformId: store.douyin_id },
  ].filter(p => p.platformId);

  return (
    <div className="pb-24">
      {/* 店铺信息 */}
      <div className="relative px-5 pt-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50">
          <div className="flex gap-4">
            {store.logo && (
              <img src={store.logo} alt="logo" className="w-16 h-16 rounded-2xl border-2 border-white shadow-sm shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">{store.name}</h1>
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="text-xs truncate">{store.address || '暂未设置地址'}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{store.intro || '该门店暂无介绍'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 发视频 */}
      <div className="mt-8 px-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg">
            <ChevronRight className="w-4 h-4 rotate-0" />
            发视频
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer" onClick={() => handleActionClick('douyin', '发抖音', store.douyin_id)}>
          <div className="flex items-center gap-3">
            <img src="/images/dy3-BGt2AXqF.png" alt="douyin" className="w-10 h-10" />
            <span className="font-bold text-gray-800">发抖音</span>
          </div>
          <img src="/images/fdy3-jepmxUWu.png" alt="douyin_tip" className="h-8" />
        </div>
      </div>

      {/* 点评打卡 */}
      <div className="mt-8 px-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg">
            <ChevronRight className="w-4 h-4 rotate-0" />
            点评打卡
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => handleActionClick('comment', '大众点评', store.comment_id)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-all">
            <img src="/images/dz3-DHVq_Tvo.png" alt="dz" className="w-10 h-10" />
            <span className="font-bold text-sm text-gray-800">大众点评</span>
          </div>
          <div onClick={() => handleActionClick('douyin', '抖音点评', store.douyin_id)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-all">
            <img src="/images/dy3-BGt2AXqF.png" alt="dy" className="w-10 h-10" />
            <span className="font-bold text-sm text-gray-800">抖音点评</span>
          </div>
          <div onClick={() => handleActionClick('gaode', '高德点评', store.gddp_id)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-all">
            <img src="/images/gd3-B5SIdw-o.png" alt="gd" className="w-10 h-10" />
            <span className="font-bold text-sm text-gray-800">高德点评</span>
          </div>
          <div onClick={() => handleActionClick('meituan', '美团点评', store.meituan_id)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-all">
            <img src="/images/mt3-aVby1Iyt.png" alt="mt" className="w-10 h-10" />
            <span className="font-bold text-sm text-gray-800">美团点评</span>
          </div>
        </div>
      </div>

      {/* 微信营销 */}
      <div className="mt-8 px-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg">
            <ChevronRight className="w-4 h-4 rotate-0" />
            微信营销
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 active:scale-[0.98] transition-all cursor-pointer" onClick={() => { 
          setModalTitle('加微信'); 
          setModalType('wechat'); 
          setSelectedWechatImageIdx(0); 
          setIsModalOpen(true); 
        }}>
          <img src="/images/wx3--tPhQQbd.png" alt="wx" className="w-10 h-10" />
          <span className="font-bold text-gray-800">+ 加微信</span>
        </div>
      </div>

      {/* 商家团购 */}
      <div className="mt-8 px-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg">
            <ChevronRight className="w-4 h-4 rotate-0" />
            商家团购
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-around">
          {(() => {
            const gpList = Array.isArray(groupPurchases) ? groupPurchases : [];
            const meituan = gpList.find(g => g.title?.includes('美团'))?.url;
            const dianping = gpList.find(g => g.title?.includes('大众'))?.url;
            const douyin = gpList.find(g => g.title?.includes('抖音'))?.url;

            return (
              <>
                <a 
                  href={meituan || '#'} 
                  onClick={(e) => handleGroupPurchaseClick(e, meituan)}
                  target="_blank"
                  className="flex flex-col items-center gap-1 active:scale-95 transition-all"
                >
                  <img src="/images/mttg3-Cq1UA8g7.png" alt="mttg" className="w-12 h-12" />
                  <span className="text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full">美团团</span>
                </a>
                <a 
                  href={dianping || '#'} 
                  onClick={(e) => handleGroupPurchaseClick(e, dianping)}
                  target="_blank"
                  className="flex flex-col items-center gap-1 active:scale-95 transition-all"
                >
                  <img src="/images/dzdptg3-BVsE92yy.png" alt="dztg" className="w-12 h-12" />
                  <span className="text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full">大众点评团</span>
                </a>
                <a 
                  href={douyin || '#'} 
                  onClick={(e) => handleGroupPurchaseClick(e, douyin)}
                  target="_blank"
                  className="flex flex-col items-center gap-1 active:scale-95 transition-all"
                >
                  <img src="/images/dytg3-CxfQN6Nv.png" alt="dytg" className="w-12 h-12" />
                  <span className="text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full">抖音团</span>
                </a>
              </>
            );
          })()}
        </div>
      </div>

      {/* 关注账号 */}
      <div className="mt-8 px-5 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg">
            <ChevronRight className="w-4 h-4 rotate-0" />
            关注账号
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 active:scale-95 transition-all cursor-pointer w-fit pr-6" onClick={handleFollowDouyinClick}>
           <div className="w-12 h-12 rounded-full border-2 border-gray-50 flex items-center justify-center overflow-hidden shrink-0">
             <img src="/images/dy3-BGt2AXqF.png" alt="dy_gz" className="w-8 h-8" />
           </div>
           <span className="text-sm bg-black text-white px-3 py-1 rounded-full font-bold whitespace-nowrap">+ 关注抖音</span>
        </div>
      </div>

      {/* 底部连接栏 */}
      <div className="fixed bottom-4 left-5 right-5 bg-white/90 backdrop-blur-md h-12 rounded-full border border-gray-100 shadow-lg flex items-center justify-between px-6 z-40">
        <span className="text-sm font-bold text-gray-800 truncate mr-4">{store.name}</span>
        <div 
          onClick={() => { setModalTitle('连接 WiFi'); setModalType('wifi'); setIsModalOpen(true); }}
          className="bg-cyan-200 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-gray-800 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Wifi className="w-3 h-3" />
          点击连接
        </div>
      </div>

      {/* 弹窗逻辑 */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
      >
        {modalType === 'platform' && (
          <div className="space-y-6">
            {/* 素材图预览与选择 */}
            <div className="space-y-3">
              <div className="text-xs text-gray-500 font-bold flex items-center justify-between px-1">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-gray-400 rounded-full"></span>
                  推荐配图 (点击切换预览)
                </div>
                <span className="text-[10px] text-blue-500">长按大图可保存</span>
              </div>
              
              {/* 大图预览 */}
              <div className="relative aspect-[4/3] rounded-3xl bg-gray-50 border border-gray-100 overflow-hidden shadow-inner">
                {(() => {
                  let rawImages = store.images;
                  if (typeof rawImages === 'string') {
                    try { rawImages = JSON.parse(rawImages); } catch (e) { rawImages = []; }
                  }
                  
                  // 获取所有微信图片的 URL 列表用于过滤
                  let wechatUrlList: string[] = [];
                  try {
                    if (typeof store.qun_img === 'string') {
                      if (store.qun_img.startsWith('[')) {
                        wechatUrlList = JSON.parse(store.qun_img);
                      } else {
                        wechatUrlList = store.qun_img.split(',').filter(s => s.trim());
                      }
                    } else if (Array.isArray(store.qun_img)) {
                      wechatUrlList = store.qun_img;
                    }
                  } catch (e) {}

                  // 过滤逻辑：排除 Logo 和 所有的微信二维码图片
                  const allImages = (Array.isArray(rawImages) ? rawImages : [])
                    .filter(img => 
                      img && 
                      typeof img === 'string' && 
                      img.startsWith('http') && 
                      img !== store.logo && 
                      !wechatUrlList.includes(img)
                    );
                  
                  const currentImg = allImages[selectedImageIdx];
                  
                  if (!currentImg) {
                    return (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                        <ImageIcon className="w-10 h-10 opacity-20" />
                        <span className="text-sm">暂无打卡素材图</span>
                      </div>
                    );
                  }
                  
                  return (
                    <img 
                      src={currentImg} 
                      alt="preview" 
                      className="w-full h-full object-contain animate-in fade-in zoom-in-95 duration-300"
                    />
                  );
                })()}
              </div>

              {/* 缩略图列表 */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {(() => {
                  let rawImages = store.images;
                  if (typeof rawImages === 'string') {
                    try { rawImages = JSON.parse(rawImages); } catch (e) { rawImages = []; }
                  }

                  // 获取所有微信图片的 URL 列表用于过滤
                  let wechatUrlList: string[] = [];
                  try {
                    if (typeof store.qun_img === 'string') {
                      if (store.qun_img.startsWith('[')) {
                        wechatUrlList = JSON.parse(store.qun_img);
                      } else {
                        wechatUrlList = store.qun_img.split(',').filter(s => s.trim());
                      }
                    } else if (Array.isArray(store.qun_img)) {
                      wechatUrlList = store.qun_img;
                    }
                  } catch (e) {}

                  return (Array.isArray(rawImages) ? rawImages : [])
                    .filter(url => 
                      url && 
                      typeof url === 'string' && 
                      url.startsWith('http') && 
                      url !== store.logo && 
                      !wechatUrlList.includes(url)
                    )
                    .map((url, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedImageIdx(idx)}
                        className={cn(
                          "relative shrink-0 w-16 h-16 rounded-xl border-2 transition-all overflow-hidden",
                          selectedImageIdx === idx ? "border-blue-500 scale-105 shadow-md" : "border-transparent opacity-60"
                        )}
                      >
                        <img src={url} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[8px] text-center py-0.5 backdrop-blur-[2px]">
                          素材{idx+1}
                        </div>
                      </div>
                    ));
                })()}
              </div>
            </div>

            {/* AI 文案选择 */}
            <div className="space-y-4">
              <div className="text-xs text-blue-600 font-bold flex items-center gap-1">
                <span className="w-1 h-3 bg-blue-600 rounded-full"></span>
                AI 生成推荐语 (点击选择其中一条)
              </div>
              
              {isGenerating ? (
                <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 border border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">智能 AI 正在为您构思...</span>
                </div>
              ) : (
                <div className="grid gap-3">
                  {copywritingOptions.map((text, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedCopyIdx(idx)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group",
                        selectedCopyIdx === idx 
                          ? "bg-blue-50 border-blue-200 shadow-sm" 
                          : "bg-white border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <p className={cn(
                        "text-sm leading-relaxed",
                        selectedCopyIdx === idx ? "text-blue-900 font-medium" : "text-gray-600"
                      )}>
                        {text}
                      </p>
                      {selectedCopyIdx === idx && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-blue-600 text-white p-1 rounded-bl-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => copyToClipboard(copywritingOptions[selectedCopyIdx] || '')}
                disabled={isGenerating || copywritingOptions.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 py-3 rounded-2xl text-sm font-bold hover:bg-blue-100 active:scale-95 transition-all disabled:opacity-50"
              >
                <Copy className="w-4 h-4" />
                复制选中的推荐语
              </button>
            </div>

            {/* 跳转按钮 */}
            <a
              href={getPlatformUrl(activePlatformType, activePlatformId)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 py-4 rounded-2xl text-white font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all text-center"
            >
              <ExternalLink className="w-5 h-5" />
              前往打卡参与
            </a>
            
            <p className="text-[10px] text-center text-gray-400">
              温馨提示：复制文案后打开对应 App 粘贴即可
            </p>
          </div>
        )}

        {modalType === 'wechat' && (
          <div className="space-y-6">
            {/* 微信二维码选择展示 */}
            {(() => {
              let wechatImgs = [];
              try {
                if (typeof store.qun_img === 'string') {
                  if (store.qun_img.startsWith('[')) {
                    wechatImgs = JSON.parse(store.qun_img);
                  } else {
                    wechatImgs = store.qun_img.split(',').filter(s => s.trim());
                  }
                } else if (Array.isArray(store.qun_img)) {
                  wechatImgs = store.qun_img;
                }
              } catch (e) {
                wechatImgs = [store.qun_img];
              }
              
              const validImgs = wechatImgs.filter((img: any) => img && typeof img === 'string' && img.startsWith('http'));
              
              if (validImgs.length === 0) {
                return (
                  <div className="w-full aspect-square rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
                    <span className="text-gray-400 text-sm">商家暂未设置二维码</span>
                  </div>
                );
              }
              
              const currentImg = validImgs[selectedWechatImageIdx] || validImgs[0];
              
              return (
                <div className="space-y-6">
                  {/* 大图预览 */}
                  <div className="relative aspect-square rounded-3xl bg-white border border-gray-100 overflow-hidden shadow-sm">
                    <img 
                      src={currentImg} 
                      alt="wechat_qr" 
                      className="w-full h-full object-contain animate-in fade-in zoom-in-95 duration-300" 
                    />
                    <div className="absolute top-3 right-3 bg-black/40 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                      长按识别二维码
                    </div>
                  </div>

                  {/* 缩略图选择 (仅当有多张时显示) */}
                  {validImgs.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {validImgs.map((img: string, idx: number) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedWechatImageIdx(idx)}
                          className={cn(
                            "relative shrink-0 w-16 h-16 rounded-xl border-2 transition-all overflow-hidden",
                            selectedWechatImageIdx === idx ? "border-green-500 scale-105 shadow-md" : "border-transparent opacity-60"
                          )}
                        >
                          <img src={img} className="w-full h-full object-cover" />
                          <div className={cn(
                            "absolute bottom-0 left-0 right-0 text-white text-[8px] text-center py-0.5 backdrop-blur-[2px]",
                            selectedWechatImageIdx === idx ? "bg-green-600/60" : "bg-black/40"
                          )}>
                            二维码{idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-500 font-medium text-center italic">
                    {validImgs.length > 1 ? '点击下方缩略图可切换不同二维码' : '请长按上方二维码识别或保存'}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {modalType === 'wifi' && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">店内专属 WiFi</h4>
              <p className="text-xs text-blue-600">欢迎体验高速无忧网络</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">WiFi 名称</span>
                <span className="font-bold text-gray-900">{store.wifi_name || '未设置'}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">WiFi 密码</span>
                <span className="font-bold text-gray-900">{store.wifi_pwd || '未设置'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                copyToClipboard(store.wifi_pwd);
                alert('密码已复制，请在 WiFi 设置中粘贴连接');
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 py-4 rounded-2xl text-white font-bold active:scale-95 transition-all"
            >
              <Copy className="w-5 h-5" />
              复制密码并连接
            </button>
          </div>
        )}
      </Modal>

      {/* 微信引导遮罩层 */}
      {showWechatGuide && (
        <div 
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col items-center justify-start pt-12 px-10 text-white"
          onClick={() => setShowWechatGuide(false)}
        >
          <div className="self-end mr-4 mb-4 animate-bounce">
            <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </div>
          <div className="text-right self-end mr-2 space-y-2">
            <p className="text-xl font-bold italic">点击右上角菜单</p>
            <p className="text-sm opacity-80">选择“在浏览器中打开”</p>
          </div>
          
          <div className="mt-20 bg-white/10 rounded-3xl p-8 border border-white/20 backdrop-blur-sm w-full space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">为了更好的体验</h3>
                <p className="text-xs opacity-60 text-blue-200">微信环境限制了部分跳转功能</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p>Android 用户请选择 <span className="font-bold text-blue-400">“在浏览器打开”</span></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</div>
                <p>iOS 用户请选择 <span className="font-bold text-blue-400">“在 Safari 中打开”</span></p>
              </div>
            </div>
            
            <button className="w-full py-4 bg-blue-600 rounded-2xl font-bold shadow-lg shadow-blue-900/40 active:scale-95 transition-all">
              我知道了，继续访问
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <StoreContent />
    </Suspense>
  );
}
