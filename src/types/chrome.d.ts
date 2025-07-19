// Chrome Extension API types
declare namespace chrome {
  namespace runtime {
    interface MessageSender {
      tab?: chrome.tabs.Tab;
      frameId?: number;
      id?: string;
      url?: string;
      tlsChannelId?: string;
    }
    
    const onMessage: {
      addListener(
        callback: (
          request: any,
          sender: chrome.runtime.MessageSender,
          sendResponse: (response?: any) => void
        ) => void
      ): void;
    };
  }
  
  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
    }
  }
} 