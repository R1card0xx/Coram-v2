/**
 * CORAM Audio & Speech Service
 * Provides realistic audio chimes via Web Audio API
 * and spoken voice notifications in Portuguese (PT-BR) via Web Speech API.
 */

class AudioService {
  private audioCtx: AudioContext | null = null;
  private isSpeaking: boolean = false;

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Plays a pleasant gentle reminder chime (two-tone harmonious chord)
   */
  public playReminderChime(): void {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Tone 1 - E5 (659 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.85);

      // Tone 2 - G5 (783 Hz) with slight delay
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.15);
      gain2.gain.setValueAtTime(0.001, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.25, now + 0.22);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 1.25);
    } catch {
      // AudioContext might be blocked until user gesture, safely ignore
    }
  }

  /**
   * Speaks given text in Brazilian Portuguese
   */
  public speak(text: string, onEnd?: () => void): void {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95; // Slightly slower, clear for elderly users
      utterance.pitch = 1.0;

      // Select Brazilian Portuguese voice if available
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find((v) => v.lang.startsWith('pt') || v.lang.includes('BR'));
      if (ptVoice) {
        utterance.voice = ptVoice;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  public stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  public getSpeakingStatus(): boolean {
    return this.isSpeaking;
  }
}

export const audioService = new AudioService();
