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
    
    const sendMessage: {
      (message: any, callback?: (response: any) => void): void;
    };
    
    const onInstalled: {
      addListener(callback: (details: any) => void): void;
    };
  }
  
  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
    }
    
    const sendMessage: {
      (tabId: number, message: any, callback?: (response: any) => void): void;
    };
  }
  
  namespace contextMenus {
    const create: {
      (createProperties: {
        id: string;
        title: string;
        contexts: string[];
      }): void;
    };
    
    const onClicked: {
      addListener(callback: (info: any, tab?: chrome.tabs.Tab) => void): void;
    };
  }
}
