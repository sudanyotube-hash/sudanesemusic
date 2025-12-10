import { GoogleGenAI, Type } from "@google/genai";
import { SeoResult, GenerationParams } from "../types";

export const generateSeoData = async (params: GenerationParams): Promise<SeoResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    قم بدور خبير تسويق موسيقي وخبير سيو (SEO) متخصص في المحتوى السوداني (Sudanese Music & Culture) على يوتيوب.
    أريد خطة شاملة لأرشفة فيديو غنائي/موسيقي سوداني وزيادة مشاهداته (Viral) وسط الجمهور السوداني والمحبين للفن السوداني.
    
    معلومات الفيديو:
    - عنوان الأغنية/الحفلة: ${params.topic}
    - تفاصيل إضافية (كلمات، مناسبة، فنان): ${params.details}
    - الجمهور المستهدف: ${params.targetAudience}

    إرشادات خاصة بالسوق السوداني:
    - شرط أساسي: يجب أن تتضمن العناوين والوصف عبارة "أغاني سودانية" أو "Sudanese Songs" لضمان أرشفة الفيديو في محركات البحث تحت هذا التصنيف.
    - استخدم كلمات مثل: (جديد، حصري، حفلة، زنق، طرب، سوداني، 2024، 2025، ردم، كتمت، صولة، استماع).
    - ركز على اللهجة السودانية في العناوين والوصف.
    - ضع في اعتبارك أنواع الموسيقى (حقيبة، دليب، طمبور، راب سوداني، مدائح، زنق، جرتك).

    المطلوب توليده بتنسيق JSON دقيق:
    1. titles: قائمة بـ 5 عناوين قوية جداً (Clickbait) تجذب الجمهور السوداني وتتضمن عبارة "أغاني سودانية" (مثلاً: "أجمل أغاني سودانية 2024.."، "جديد الأغاني السودانية..").
    2. description: وصف احترافي يتضمن كلمات الأغنية (إذا أمكن تخيلها أو طلبها)، أسماء العازفين، معلومات الحجز، وروابط السوشيال ميديا، مع مقدمة جذابة باللهجة السودانية تحتوي على "أغاني سودانية".
    3. tags: قائمة بـ 20-30 كلمة مفتاحية (Tags) قوية جداً (عربي وإنجليزي) تستهدف الترند السوداني (Sudanese Music, Sudan, Khartoum, ...).
    4. hashtags: قائمة بـ 5-10 هاشتاجات (#) نشطة في السودان حالياً.
    5. thumbnailIdeas: 3 أفكار لتصميم الصورة المصغرة (Thumbnail) تكون ملفتة وتناسب الذوق السوداني (مثلاً التركيز على وجه الفنان، لقطة من الحفل، كتابة بخط عريض).
    6. strategy: نصيحة استراتيجية لانتشار الفيديو في "قروبات الواتساب" والفيسبوك وسط السودانيين.
    7. schemaMarkup: كود JSON-LD (VideoObject) جاهز للأرشفة.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of viral video titles optimized for Sudanese audience including 'أغاني سودانية'"
            },
            description: {
              type: Type.STRING,
              description: "Full SEO optimized video description including 'أغاني سودانية'"
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Comma separated list of SEO tags"
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of hashtags including the #"
            },
            thumbnailIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Visual descriptions for thumbnail design"
            },
            strategy: {
              type: Type.STRING,
              description: "Strategic advice for algorithm optimization in Sudan"
            },
            schemaMarkup: {
              type: Type.STRING,
              description: "JSON-LD code block for VideoObject schema"
            }
          },
          required: ["titles", "description", "tags", "hashtags", "thumbnailIdeas", "strategy", "schemaMarkup"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SeoResult;
    } else {
      throw new Error("لم يتم استلام أي بيانات من النموذج.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};