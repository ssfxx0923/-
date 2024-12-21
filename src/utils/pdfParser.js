import * as PDFJS from 'pdfjs-dist'
import PDFWorker from 'pdfjs-dist/build/pdf.worker.min'

PDFJS.GlobalWorkerOptions.workerSrc = PDFWorker

export const parsePDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFJS.getDocument(arrayBuffer).promise
    
    const questions = []
    let currentQuestion = null
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const text = textContent.items.map(item => item.str).join(' ')
      
      // 简单的题目解析示例
      const questionMatches = text.match(/(\d+)[.、](.+?)\n/g)
      const optionMatches = text.match(/[A-D][.、](.+?)\n/g)
      
      if (questionMatches && optionMatches) {
        questionMatches.forEach((q, index) => {
          const options = optionMatches.slice(index * 4, (index + 1) * 4)
          if (options.length === 4) {
            questions.push({
              question: q.replace(/^\d+[.、]/, '').trim(),
              options: options.map(opt => opt.replace(/^[A-D][.、]/, '').trim()),
              answer: 0, // 默认答案，实际应该根据PDF中的答案标记来确定
              explanation: '' // 解析说明，需要根据实际PDF格式来提取
            })
          }
        })
      }
    }
    
    if (questions.length === 0) {
      throw new Error('未能识别出题目，请检查PDF格式')
    }
    
    return questions
  } catch (error) {
    console.error('PDF解析错误:', error)
    throw error
  }
} 